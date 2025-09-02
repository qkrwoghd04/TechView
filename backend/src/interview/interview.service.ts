import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

import { SubmitInterviewDto } from './dto/submit-interview.dto';
import { InterviewResultDto, FeedbackDto } from './dto/interview-response.dto';

@Injectable()
export class InterviewService {
  private openai: OpenAI;
  private prisma = new PrismaClient();

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async evaluateAnswers(dto: SubmitInterviewDto): Promise<InterviewResultDto> {
    // 1. AI 프롬프트 구성
    const prompt = `
      당신은 소프트웨어 기술 면접관입니다. 
      지원자의 답변을 아래 기준에 따라 평가하세요. 

      ### 평가 기준 (각 항목 20점 만점)
      1. 정확성 (Accuracy)
      2. 깊이 (Depth)
      3. 실무 연관성 (Practical Relevance)
      4. 명확성 (Clarity)
      5. 창의성 (Creativity)

      ### 출력 형식
      반드시 입력으로 받은 questionId를 그대로 사용해야 합니다.
      JSON:
      {
        "feedback": [
          { 
            "questionId": string,   // dto.answers의 questionId 그대로 반환
            "scores": { "accuracy": number, "depth": number, "relevance": number, "clarity": number, "creativity": number },
            "totalScore": number,
            "comment": string
          }
        ],
        "averageScore": number,
        "summary": string
      }

      카테고리: ${dto.category}
      답변 목록:
      ${dto.answers
        .map(
          (a) => `
questionId: ${a.questionId}
question: ${a.question}
answer: ${a.answer}
          `,
        )
        .join('\n')}
    `;

    // 2. OpenAI 호출
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a technical interviewer.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    const evaluation = JSON.parse(content);

    // 3. Prisma에서 모범답변 가져오기
    const questionIds = dto.answers.map((a) => a.questionId);
    const questions = await this.prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: { id: true, question: true, answer: true },
    });

    // 4. feedback 병합
    const enrichedFeedback: FeedbackDto[] = evaluation.feedback.map((fb) => {
      const submitted = dto.answers.find((a) => a.questionId === fb.questionId);
      const q = questions.find((q) => q.id === fb.questionId);

      return {
        ...fb,
        question: q?.question ?? submitted?.question ?? '',
        userAnswer: submitted?.answer ?? '',
        modelAnswer: q?.answer ?? null,
      };
    });

    // 5. 최종 응답
    return {
      feedback: enrichedFeedback,
      averageScore: evaluation.averageScore,
      summary: evaluation.summary,
    };
  }
}
