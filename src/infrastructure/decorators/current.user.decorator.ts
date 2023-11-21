import { UserModel } from '../../domain/models/user.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(<T>(data: unknown, ctx: ExecutionContext): T => {
  const request: Request & { user: UserModel } = ctx.switchToHttp().getRequest();
  return request.user as T;
});
