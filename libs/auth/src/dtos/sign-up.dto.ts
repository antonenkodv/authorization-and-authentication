import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'User email', example: 'sergey.mell@agilie.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User password', example: 'qqqqqqqqA1' })
  password: string;
}
