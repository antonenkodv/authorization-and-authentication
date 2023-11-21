import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthUserRepository)
    private readonly userRepository: AuthUserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //if JWT expired , the request will be denied and a 401 Unauthorized response sent
      secretOrKey: configService.get('JWT.SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return user;
  }
}
