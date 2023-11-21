import { Injectable } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database/services/prisma/prisma.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository implements AuthUserRepository {
  constructor(private prismaService: PrismaService) {}

  createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prismaService.user.create({ data });
  }

  findByEmail(email: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findById(id: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  deleteUser(data: Prisma.UserWhereUniqueInput): void {
    this.prismaService.user.delete({ where: data });
  }
}
