import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActionsService } from '../interfaces/actions-service.interface';
import { Container } from '../../containers/types/container.type';
import { ActionDto } from '../dtos/action.dto';
import { IDataServices } from '../../../core/abstracts/data-services.abstract';

@Injectable()
export class ActionsServiceImpl implements ActionsService {
  constructor(private readonly IdataService: IDataServices) {}

  async putThingInsideContainer(dto: ActionDto): Promise<Container> {
    const thing = await this.IdataService.things.findOne(dto.thingId);
    const container = await this.IdataService.containers.findOne(
      dto.containerId,
    );

    if (thing.capacity > container.capacity) {
      throw new HttpException(
        'The thing does nit fit this container!',
        HttpStatus.CONFLICT,
      );
    }

    if (thing.capacity > container.availableCapacity) {
      throw new HttpException(
        'The container is not empty! Not enought capacity to put one more thing',
        HttpStatus.CONFLICT,
      );
    }

    return this.IdataService.containers.putThingIntoContainer(thing, container);
  }

  async removeThingFromContainer(dto: ActionDto): Promise<Container> {
    const thing = await this.IdataService.things.findOne(dto.thingId);
    const container = await this.IdataService.containers.findOne(
      dto.containerId,
    );

    return this.IdataService.containers.removeThingFromContainer(
      thing,
      container,
    );
  }
}
