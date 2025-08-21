import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  async login(@Body('password') password: string, @Res() res: Response) {
    const token = await this.adminService.validatePassword(password);

    res.cookie('access_token', token, {
      httpOnly: true, // JS에서 접근 불가 → XSS 방어
      secure: true, // HTTPS에서만 전송
      sameSite: 'strict', // CSRF 방어 강화
      maxAge: 3600 * 1000, // 1시간
    });

    return res.send({ message: '로그인 성공' });
  }
}
