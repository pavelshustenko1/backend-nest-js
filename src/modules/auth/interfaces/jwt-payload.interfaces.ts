import { Role } from '../../../core/enum/roles.enum';

export interface JwtPayload {
  id: string;
  roles: Role[];
}
