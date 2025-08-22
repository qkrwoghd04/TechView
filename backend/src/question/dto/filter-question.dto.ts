import { Category } from '@prisma/client';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterQuestionDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: Category;
}
