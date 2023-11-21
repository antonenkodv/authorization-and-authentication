import { Expose } from 'class-transformer';

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
