import { Body, Controller, Post } from '@nestjs/common';
import { SubmitInterviewDto } from './dto/submit-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post('submit')
  async submitInterview(@Body() dto: SubmitInterviewDto) {
    return this.interviewService.evaluateAnswers(dto);
  }
}
