import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsNotEmpty()
  page: number = 1;

  @IsInt()
  @IsNotEmpty()
  limit: number = 10;
}
