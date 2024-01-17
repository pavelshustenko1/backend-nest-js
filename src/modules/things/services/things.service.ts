import { IDataServices } from '../../../core/abstracts/data-services.abstract';
import { ThingDto } from '../dtos/thing.dto';
import { ThingsService } from '../interfaces/things-service.interface';
import { Injectable } from '@nestjs/common';
import { Thing } from '../types/thing.type';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ThingsServiceImpl implements ThingsService {
  constructor(private readonly IDataService: IDataServices) {}

  async createThing(dto: ThingDto): Promise<Thing> {
    const thing = new Thing({
      ...dto,
      id: uuid(),
      capacity: dto.width * dto.height * dto.length,
    });

    return this.IDataService.things.createOne(thing);
  }

  async getThings(): Promise<Thing[]> {
    return this.IDataService.things.findAll();
  }

  async deleteThing(id: string): Promise<Thing> {
    const thingToDelete = this.IDataService.things.findOne(id);

    this.IDataService.things.deleteOne(id);

    return thingToDelete;
  }
}
