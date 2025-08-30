import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '@prisma/client';

export class SubmitAnswerDto {
  @IsString()
  questionId: string;

  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class SubmitInterviewDto {
  @IsString()
  @IsNotEmpty()
  category: Category;

  @IsArray()
  answers: SubmitAnswerDto[];
}
