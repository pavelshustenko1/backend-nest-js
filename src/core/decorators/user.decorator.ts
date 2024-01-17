import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/interfaces/jwt-payload.interfaces';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user as JwtPayload;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.id;
  },
);
