import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilterQuestionDto } from './dto/filter-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  /** ✅ 전체 문제 가져오기 (관리용) */
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FilterQuestionDto) {
    return this.questionsService.getQuestions(
      query.q,
      query.category,
      query.page,
      query.limit,
    );
  }

  /** ✅ 특정 문제 (id로 조회) */
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  /** ✅ 랜덤 N개 문제 (예: 5개) */
  @Get('random/:count')
  async getRandom(@Param('count') count: string) {
    return this.questionsService.getRandomQuestions(Number(count));
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
