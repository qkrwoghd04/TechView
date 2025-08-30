import { Injectable } from '@nestjs/common';
import { SubmitInterviewDto } from './dto/submit-interview.dto';
import OpenAI from 'openai';

@Injectable()
export class InterviewService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async evaluateAnswers(dto: SubmitInterviewDto) {
    const prompt = `
                    당신은 소프트웨어 기술 면접관입니다. 
                    지원자의 답변을 아래 기준에 따라 엄격하게 평가하세요. 
                    각 문항에 대해 다섯 가지 항목별로 0~20점 단위(소수점 1자리까지 허용)로 채점하고, 총합을 100점 만점으로 계산하세요.

                    ### 평가 기준 (각 항목 20점 만점)
                    1. 정확성 (Accuracy): 개념을 올바르게 이해하고 설명했는가? 
                    2. 깊이 (Depth): 단순한 정의를 넘어 심화된 내용이나 실제 상황에 대한 이해가 드러나는가?
                    3. 실무 연관성 (Practical Relevance): 답변이 실무 경험과 구체적인 사례와 얼마나 잘 연결되는가?
                    4. 논리적 구성 (Clarity & Structure): 답변이 논리적이고 일관되며 명확하게 서술되었는가?
                    5. 창의성 / 문제 해결 관점 (Creativity & Problem-Solving): 답변에서 독창적인 접근이나 응용력이 보이는가?

                    ### 출력 형식
                    JSON 형식으로 응답하세요:

                    {
                    "feedback": [
                        { 
                        "questionId": string,
                        "scores": {
                            "accuracy": number,
                            "depth": number,
                            "relevance": number,
                            "clarity": number,
                            "creativity": number
                        },
                        "totalScore": number,
                        "comment": string
                        }
                    ],
                    "averageScore": number,
                    "summary": string
                    }

                    ### 추가 지침
                    - 각 점수는 반드시 소수점 1자리까지 포함할 수 있습니다 (예: 17.3).
                    - comment에는 구체적으로 잘한 점과 부족한 점을 모두 적으세요.
                    - summary에는 전체 답변에서 드러난 강점과 개선할 점을 종합적으로 작성하세요.

                    카테고리: ${dto.category}
                    답변 목록:
                    ${dto.answers.map(
                      (a, i) => `
                    Q${i + 1}: ${a.question}
                    A${i + 1}: ${a.answer}
                    `,
                    )}
`;

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
    return JSON.parse(content);
  }
}
