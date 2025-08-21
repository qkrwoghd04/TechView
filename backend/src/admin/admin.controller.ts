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
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600 * 1000,
      domain: '.jaehong.link',
    });

    return res.send({ message: '로그인 성공' });
  }
}
