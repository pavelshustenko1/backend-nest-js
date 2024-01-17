import { ContainersRepository } from '../data-sources/internal/repositories/containers.repository';
import { ThingsRepository } from '../data-sources/internal/repositories/things.repository';
import { UsersRepository } from '../data-sources/internal/repositories/users.repository';

export abstract class IDataServices {
  containers: ContainersRepository;
  things: ThingsRepository;
  users: UsersRepository;
}
