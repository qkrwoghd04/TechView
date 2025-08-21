import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  async login(@Body('password') password: string) {
    const token = await this.adminService.validatePassword(password);
    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }
}
