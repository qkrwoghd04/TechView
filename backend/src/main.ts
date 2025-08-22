import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

// 환경변수 설정
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'https://www.jaehong.link'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청값을 DTO 타입으로 변환
      transformOptions: {
        enableImplicitConversion: true, // "10" → 10 같은 자동 변환 허용
      },
      whitelist: true, // DTO에 정의되지 않은 값은 무시 (ex ?page=1&limit=10&hacker=1)
      forbidNonWhitelisted: false, // 정의되지 않은 값 들어오면 에러 낼지 여부
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
