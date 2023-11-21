import { UserModel } from '../../../../apps/app/src/infrastructure/models/user.model';

export interface AuthUserRepository {
  findByEmail(email: string): Promise<UserModel>;
  createUser(email: string, encryptedPassword: string): Promise<UserModel>;
  updatePassword(email: string, encryptedPassword: string): Promise<UserModel>;
  deleteUser(email: string): Promise<void>;
}

export const AuthUserRepository = Symbol('AuthUserRepository');
