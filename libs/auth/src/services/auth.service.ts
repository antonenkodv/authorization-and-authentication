import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '@auth/auth/dtos/sign-up.dto';
import { AuthSessionRepository } from '@auth/auth/repositories/auth.session.repository';
import { SessionRepository } from '../../../../src/domain/repositories/session.repository';
import { UserRepository } from '../../../../src/domain/repositories/user.repository';
import { SignInDto } from '@auth/auth/dtos/sign-in.dto';
import { plainToInstance } from 'class-transformer';
import { UserWithNoPassword } from '../../../../src/domain/models/user.model';

@Injectable()
export class AuthService {
  private ONE_SECOND_MILLISECONDS = 1000;

  constructor(
    @Inject(AuthUserRepository) private userRepository: UserRepository,
    @Inject(AuthSessionRepository) private sessionRepository: SessionRepository,
    private jwtService: JwtService,
  ) {}

  async signUp({ name, email, password }: SignUpDto): Promise<{ accessToken: string }> {
    const isUserExist = await this.userRepository.findByEmail(email);
    if (isUserExist) throw new ConflictException(`User with email ${email} already exists`);

    const encryptedPassword = await hash(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: encryptedPassword,
    });

    const accessToken = await this.jwtService.signAsync({ id: user.id });
    const { id: userId, exp } = this.jwtService.verify(accessToken);

    await this.sessionRepository.createSession({
      token: accessToken,
      expiresIn: new Date(exp * this.ONE_SECOND_MILLISECONDS),
      userId,
    });
    return {
      accessToken,
    };
  }

  async signIn({ email, password }: SignInDto): Promise<{ accessToken: string; user: UserWithNoPassword }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const areEqual = await this.comparePassword(user.password, password);
    if (!areEqual) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign({ id: user.id });
    const { id: userId, exp } = this.jwtService.verify(accessToken);

    await this.sessionRepository.createOrUpdateSession({
      token: accessToken,
      userId,
      expiresIn: new Date(exp * this.ONE_SECOND_MILLISECONDS),
    });
    return {
      user: plainToInstance(UserWithNoPassword, user, { excludeExtraneousValues: true }),
      accessToken,
    };
  }

  signOut(userId: string): Promise<{ count: number }> {
    return this.sessionRepository.deleteSessions({ userId });
  }

  comparePassword(encryptedPassword: string, password: string): Promise<boolean> {
    return verify(encryptedPassword, password);
  }
}
