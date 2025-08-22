import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  // 문제 생성(관리자)
  async createQuestion(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({ data });
  }

  // 전체 문제 가져오기(관리자)
  async getQuestions(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Question[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.count(),
    ]);

    return { data, total, page, limit };
  }

  async searchQuestions(
    q?: string,
    category?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const where: any = {
      OR: [
        { question: { contains: q, mode: 'insensitive' } },
        { answer: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
        { tags: { hasSome: [q] } },
      ],
    };

    if (category) {
      where.AND = { category };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.count({ where }),
    ]);

    return { data, total, page, limit, category };
  }

  // 특정 문제를 id로 조회(관리자)
  async getQuestionById(id: string): Promise<Question | null> {
    return this.prisma.question.findUnique({ where: { id } });
  }

  // 문제 수정(관리자)
  async updateQuestion(
    id: string,
    data: Prisma.QuestionUpdateInput,
  ): Promise<Question> {
    return this.prisma.question.update({ where: { id }, data });
  }

  // 문제 삭제(관리자)
  async deleteQuestion(id: string): Promise<Question> {
    return this.prisma.question.delete({ where: { id } });
  }

  // 랜덤 N개의 문제 가져오기(사용자)
  async getRandomQuestions(count: number): Promise<Question[]> {
    const total = await this.prisma.question.count();
    const skipIndexes = new Set<number>();

    // 무작위 index 추출
    while (skipIndexes.size < Math.min(count, total)) {
      skipIndexes.add(Math.floor(Math.random() * total));
    }

    const questions: Question[] = [];
    for (const skip of skipIndexes) {
      const q = await this.prisma.question.findFirst({
        skip,
        take: 1,
      });
      if (q) questions.push(q);
    }

    return questions;
  }
}
