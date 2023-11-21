import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ name: 'email', description: 'User email', example: 'bill.gates@gatesfoundation.org' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'password', description: 'User password', example: 'qwerty111' })
  readonly password: string;
}
