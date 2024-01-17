import { DatabaseService } from '../../../database/interfaces/database-service.interface';
import { Thing } from '../../../../modules/things/types/thing.type';

export class ThingsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Thing[] {
    return this.databaseService.getThings();
  }

  findOne(id: string): Thing {
    return this.databaseService.getThing(id);
  }

  createOne(thing: Thing): Thing {
    return this.databaseService.createThing(thing);
  }

  deleteOne(id: string): void {
    this.databaseService.deleteThing(id);
  }
}
