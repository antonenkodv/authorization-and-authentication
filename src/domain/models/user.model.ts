import { Expose } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserModel {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'password' })
  password: string;
}

export class UserWithNoPassword extends PartialType(OmitType(UserModel, ['password'] as const)) {}
