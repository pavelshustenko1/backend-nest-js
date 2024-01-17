import { IDataServices } from '../../../core/abstracts/data-services.abstract';
import { ContainersService } from '../interfaces/containers-service.interface';
import { Injectable } from '@nestjs/common';
import { Container } from '../types/container.type';
import { v4 as uuid } from 'uuid';
import { ContainerDto } from '../dtos/container.dto';

@Injectable()
export class ContainersServiceImpl implements ContainersService {
  constructor(private readonly IDataService: IDataServices) {}

  async createContainer(dto: ContainerDto): Promise<Container> {
    const container = new Container({
      ...dto,
      id: uuid(),
      capacity: dto.width * dto.height * dto.length,
      availableCapacity: dto.width * dto.height * dto.length,
    });

    return this.IDataService.containers.createOne(container);
  }

  async getContainers(): Promise<Container[]> {
    return this.IDataService.containers.findAll();
  }

  async deleteContainer(id: string): Promise<Container> {
    const containerToDelete = this.IDataService.containers.findOne(id);

    this.IDataService.containers.deleteOne(id);

    return containerToDelete;
  }
}
