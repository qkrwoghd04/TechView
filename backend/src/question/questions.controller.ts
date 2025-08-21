import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  /** ✅ 전체 문제 가져오기 (관리용) */
  @Get()
  async findAll() {
    return this.questionsService.getQuestions();
  }

  /** ✅ 특정 문제 (id로 조회) */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  /** ✅ 랜덤 N개 문제 (예: 5개) */
  @Get('random/:count')
  async getRandom(@Param('count') count: string) {
    return this.questionsService.getRandomQuestions(Number(count));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
