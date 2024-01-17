import { ContainerDto } from '../dtos/container.dto';
import { Container } from '../types/container.type';

export interface ContainersService {
  createContainer(dto: ContainerDto): Promise<Container>;
  getContainers(): Promise<Container[]>;
  deleteContainer(id: string): Promise<Container>;
}
