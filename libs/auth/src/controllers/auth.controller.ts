import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from '@auth/auth/dtos/sign-up.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth/services/auth.service';
import { SessionGuard } from '@auth/auth/guards/session.guard';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from '@auth/auth/dtos/sign-in.dto';
import { CurrentUser } from '../../../../src/infrastructure/decorators/current.user.decorator';
import { UserModel, UserWithNoPassword } from '../../../../src/domain/models/user.model';
import { plainToInstance } from 'class-transformer';
import { SuccessResponse } from '../../../../src/infrastructure/common/response-builder/interfaces/success.response.interface';
import { sendSuccess } from '../../../../src/infrastructure/common/response-builder/response-builder.functions';
import {
  AccessTokenExample,
  UserWithNoPasswordExample,
  UserWithTokensExample,
} from '../../../../src/infrastructure/plugins/swagger/swagger.schemas';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'User registration flow',
  })
  @ApiResponse({
    description: 'OK',
    status: '2XX',
    content: {
      'application/json': {
        example: sendSuccess(AccessTokenExample),
      },
    },
  })
  @Post('sign-up')
  async singUp(@Body() body: SignUpDto): Promise<SuccessResponse<{ accessToken: string }>> {
    const response = await this.authService.signUp(body);
    return { response };
  }

  @ApiOperation({
    summary: 'User authorization flow',
  })
  @ApiResponse({
    description: 'OK',
    status: '2XX',
    content: {
      'application/json': {
        example: sendSuccess(UserWithTokensExample),
      },
    },
  })
  @Post('sign-in')
  async signIn(@Body() body: SignInDto): Promise<SuccessResponse<{ accessToken: string; user: UserWithNoPassword }>> {
    const response = await this.authService.signIn(body);
    return { response };
  }

  @ApiOperation({
    summary: 'Session termination flow',
  })
  @ApiResponse({
    description: 'OK',
    status: '2XX',
    content: {
      'application/json': {
        example: sendSuccess('Session ended'),
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @Post('sign-out')
  async signOut(@CurrentUser() user: UserModel): Promise<SuccessResponse<string>> {
    const { count } = await this.authService.signOut(user.id);
    return { response: !!count && 'Session ended' };
  }

  @ApiOperation({
    summary: 'Get my profile',
  })
  @ApiResponse({
    description: 'OK',
    status: '2XX',
    content: {
      'application/json': {
        example: sendSuccess(UserWithNoPasswordExample),
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @Get('me')
  myProfile(@CurrentUser() user: UserModel): SuccessResponse<UserWithNoPassword> {
    return { response: plainToInstance(UserWithNoPassword, user, { excludeExtraneousValues: true }) };
  }
}
