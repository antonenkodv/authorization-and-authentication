import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { AuthSessionRepository } from '@auth/auth/repositories/auth.session.repository';
import { AuthController } from '@auth/auth/controllers/auth.controller';
import { AuthService } from '@auth/auth/services/auth.service';
import { JwtModuleProvider } from '@auth/auth/modules/jwt.module';
import { JwtStrategy } from '@auth/auth/strategies/jwt-strategy';

export interface AuthModuleOptions {
  AuthUserRepository: Type<AuthUserRepository>;
  AuthSessionRepository: Type<AuthSessionRepository>;
}

@Global()
@Module({
  imports: [],
  providers: [AuthService],
  exports: [],
  controllers: [],
})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [JwtModuleProvider],
      controllers: [AuthController],
      providers: [
        JwtStrategy,
        { provide: AuthUserRepository, useClass: options.AuthUserRepository },
        { provide: AuthSessionRepository, useClass: options.AuthSessionRepository },
      ],
    };
  }
}
