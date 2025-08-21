import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Question category (FRONTEND or BACKEND)' })
  @IsNotEmpty()
  category: Category;

  @ApiProperty({ description: 'Question title' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ description: 'Reference answer text' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    description: 'Tags for the question',
    required: false,
    example: ['react', 'javascript'],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
