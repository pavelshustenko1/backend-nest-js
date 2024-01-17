import { Container } from '../../../modules/containers/types/container.type';
import { Thing } from '../../../modules/things/types/thing.type';
import { User } from '../../../modules/users/types/user.type';

export interface IDatabase {
  things: Thing[];
  containers: Container[];
  users: User[];
}
