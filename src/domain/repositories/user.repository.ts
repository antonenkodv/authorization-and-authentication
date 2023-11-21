import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma/prisma.service';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { UserModel } from '../models/user.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements AuthUserRepository{
  constructor(private prismaService: PrismaService) {}

  createUser(data:Prisma.UserCreateInput): Promise<UserModel> {
    return this.prismaService.user.create({data });
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async deleteUser(email: string): Promise<void> {
    await this.prismaService.user.delete({ where: { email } });
  }

  async updatePassword(email: string, password: string): Promise<UserModel> {
    const user = await this.prismaService.user.update({
      where: { email },
      data: { password },
    });

    return user;
  }
}
