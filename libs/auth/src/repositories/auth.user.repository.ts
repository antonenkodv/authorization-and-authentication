import { SignUpDto } from '@auth/auth/dtos/sign-up.dto';
import { UserModel } from '../../../../src/domain/models/user.model';

export interface AuthUserRepository {
  findByEmail(email: string): Promise<UserModel>;
  findById(id: string): Promise<UserModel>;
  createUser({ name, email, password }: SignUpDto): Promise<UserModel>;
  deleteUser({ email }: { email: string }): void;
}

export const AuthUserRepository = Symbol('AuthUserRepository');
