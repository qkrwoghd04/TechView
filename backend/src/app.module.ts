import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './question/questions.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [QuestionsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
