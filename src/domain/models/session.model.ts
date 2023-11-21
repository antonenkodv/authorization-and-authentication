import { Expose } from 'class-transformer';

export class SessionModel {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'token' })
  token: string;

  @Expose({ name: 'userId' })
  userId: string;

  @Expose({ name: 'expiresIn' })
  expiresIn: Date;
}
