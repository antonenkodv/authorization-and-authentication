import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database/services/prisma/prisma.service';
import { AuthSessionRepository } from '@auth/auth/repositories/auth.session.repository';
import { SessionModel } from '../models/session.model';

@Injectable()
export class SessionRepository implements AuthSessionRepository {
  constructor(private prismaService: PrismaService) {}

  createSession(data: Prisma.SessionUncheckedCreateInput): Promise<SessionModel> {
    return this.prismaService.session.create({ data });
  }

  createOrUpdateSession(data: Prisma.SessionUncheckedCreateInput): Promise<SessionModel> {
    const { token, expiresIn, userId } = data;
    return this.prismaService.session.upsert({
      where: { userId },
      update: { token, expiresIn },
      create: { ...data },
    });
  }

  findByUserId({ userId }: { userId: string }): Promise<SessionModel> {
    return this.prismaService.session.findUnique({ where: { userId } });
  }

  deleteSessions(data: Prisma.SessionWhereUniqueInput): Promise<{ count: number }> {
    return this.prismaService.session.deleteMany({ where: data });
  }
}
