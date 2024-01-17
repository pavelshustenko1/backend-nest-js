import { ThingDto } from '../dtos/thing.dto';
import { Thing } from '../types/thing.type';

export interface ThingsService {
  createThing(dto: ThingDto): Promise<Thing>;
  getThings(): Promise<Thing[]>;
  deleteThing(id: string): Promise<Thing>;
}
