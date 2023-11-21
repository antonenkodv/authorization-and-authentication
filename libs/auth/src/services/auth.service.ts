import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthUserRepository } from '@auth/auth/repositories/auth.user.repository';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthUserRepository) private userRepository: AuthUserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const encryptedPassword = await hash(password);

    const user = await this.userRepository.createUser(email, encryptedPassword);

    const accessToken = this.jwtService.sign({ email: user.email });

    return {
      accessToken,
    };
  }
}
