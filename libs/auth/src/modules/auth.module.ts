import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { AuthController } from '@auth/auth/controllers/auth.controller';
import { AuthService } from '@auth/auth/services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@auth/auth/strategies/jwt-strategy';

export interface AuthModuleOptions {
  AuthUserRepository: Type<AuthUserRepository>;
}

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'Long secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
  controllers: [],
})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          secret: 'Long secret',
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        { provide: AuthUserRepository, useClass: options.AuthUserRepository },
      ],
    };
  }
}
