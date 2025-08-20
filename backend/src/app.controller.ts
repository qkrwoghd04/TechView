import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  healthCheck() {
    return {
      status: 'ok',
      message: this.appService.getHello(),
      timestamp: new Date().toISOString(),
    };
  }
}
