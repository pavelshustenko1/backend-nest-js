import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Role } from '../../core/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  // override default getRequest
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.getRoles(context);

    const isPublic: boolean = roles.some(item => item === Role.PUBLIC);
    if (isPublic) {
      return true;
    }

    const jwtOk = await super.canActivate(context);
    const request = this.getRequest(context);

    const userRoles = _.get(request, 'user.roles', []);

    const hasMatchingRole = () =>
      userRoles.some(role => !!roles.find(item => item === role));
    return jwtOk && userRoles && hasMatchingRole();
  }

  private getRoles(context: ExecutionContext): string[] {
    return (
      this.reflector.get<string[]>('roles', context.getHandler()) || [Role.USER]
    );
  }
}
