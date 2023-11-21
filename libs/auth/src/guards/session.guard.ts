import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSessionRepository } from '@auth/auth/repositories/auth.session.repository';
import { isAfter } from 'date-fns';
import { SessionException } from '../../../../src/infrastructure/exceptions/session.exception';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(AuthSessionRepository)
    private readonly sessionRepository: AuthSessionRepository,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    const { id: userId, exp } = this.jwtService.verify(token);
    const session = await this.sessionRepository.findByUserId({ userId });
    if (!session) throw new SessionException('Session not found', HttpStatus.NOT_FOUND);

    const currentDate = new Date();
    const expired = isAfter(exp, currentDate);
    if (expired) throw new SessionException('Unavailable session', HttpStatus.UNAUTHORIZED);

    if (session.token !== token) throw new SessionException('Invalid token', HttpStatus.UNAUTHORIZED);

    return true;
  }

  protected getToken(request: { headers: Record<string, string | string[]> }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }

    const [, token] = authorization.split(' ');
    return token;
  }
}
