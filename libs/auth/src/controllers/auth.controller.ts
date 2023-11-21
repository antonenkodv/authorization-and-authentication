import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '@auth/auth/dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth/services/auth.service';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  singUp(@Body() body: SignUpDto) {
    const { email, password } = body;
    const token = this.authService.signUp(email, password);
    return token;
  }
}
