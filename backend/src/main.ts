import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 환경변수 설정
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
