import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './infrastructure/filters/exceptions/prisma.exceptions.filter';
import { ValidationExceptionFilter } from './infrastructure/filters/exceptions/validation.exception.filter';
import { UnhandledExceptionFilter } from './infrastructure/filters/exceptions/unhandled.exceptions.filter';
import { AuthModule } from '@auth/auth/modules/auth.module';
import ConfigModuleProvider from './infrastructure/config/config.module.provider';
import { UserRepository } from './domain/repositories/user.repository';
import { SessionRepository } from './domain/repositories/session.repository';
import { SessionExceptionsFilter } from './infrastructure/filters/exceptions/session.exceptions.filter';

@Module({
  imports: [
    AuthModule.register({ AuthUserRepository: UserRepository, AuthSessionRepository: SessionRepository }),
    DatabaseModule,
    ConfigModuleProvider,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: UnhandledExceptionFilter },
    { provide: APP_FILTER, useClass: SessionExceptionsFilter },
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
    { provide: APP_FILTER, useClass: HttpException },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
  ],
})
export class AppModule {}
