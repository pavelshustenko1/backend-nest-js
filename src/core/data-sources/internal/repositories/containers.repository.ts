import { Container } from '../../../../modules/containers/types/container.type';
import { Thing } from '../../../../modules/things/types/thing.type';
import { DatabaseService } from '../../../database/interfaces/database-service.interface';

export class ContainersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Container[] {
    return this.databaseService.getContainers();
  }

  findOne(id: string): Container {
    return this.databaseService.getContainer(id);
  }

  createOne(container: Container): Container {
    return this.databaseService.createContainer(container);
  }

  deleteOne(id: string): void {
    this.databaseService.deleteContainer(id);
  }

  putThingIntoContainer(thing: Thing, container: Container): Container {
    return this.databaseService.putThingIntoContainer(thing, container);
  }

  removeThingFromContainer(thing: Thing, container: Container): Container {
    return this.databaseService.removeThingFromContainer(thing, container);
  }
}
