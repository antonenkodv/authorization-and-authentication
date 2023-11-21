import { SessionModel } from '../../../../src/domain/models/session.model';

export interface AuthSessionRepository {
  createSession({
    token,
    userId,
    expiresIn,
  }: {
    token: string;
    userId: string;
    expiresIn: Date;
  }): Promise<SessionModel>;
  createOrUpdateSession({
    token,
    userId,
    expiresIn,
  }: {
    token: string;
    userId: string;
    expiresIn: Date;
  }): Promise<SessionModel>;
  findByUserId({ userId }: { userId: string }): Promise<SessionModel>;
  deleteSessions({ userId }: { userId: string }): any;
}

export const AuthSessionRepository = Symbol('AuthSessionRepository');
