import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ name: 'email', description: 'User email', example: 'bill.gates@gatesfoundation.org' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'name', description: 'User name', example: 'williamhgates' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'password', description: 'User password', example: 'qwerty111' })
  password: string;
}
