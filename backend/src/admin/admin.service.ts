// src/admin/admin.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService) {}

  private adminHash = process.env.ADMIN_PASSWORD_HASH!;

  async validatePassword(password: string): Promise<string> {
    const isValid = await bcrypt.compare(password, this.adminHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { role: 'admin' };
    return this.jwtService.sign(payload);
  }
}
