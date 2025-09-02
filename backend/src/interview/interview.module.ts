import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 2,
      },
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
