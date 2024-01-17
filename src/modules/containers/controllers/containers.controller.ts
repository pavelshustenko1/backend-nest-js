import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  Post,
  Body,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { TYPES } from '../../../core/tokens/types';
import { ContainersService } from '../interfaces/containers-service.interface';
import { Container } from '../types/container.type';
import { ContainerDto } from '../dtos/container.dto';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enum/roles.enum';

@Controller('containers')
@UseInterceptors(ClassSerializerInterceptor)
export class ContainersController {
  constructor(
    @Inject(TYPES.services.ContainersService)
    private containersService: ContainersService,
  ) {}

  @Roles(Role.USER)
  @Post()
  async createContainer(@Body() dto: ContainerDto): Promise<Container> {
    return this.containersService.createContainer(dto);
  }

  @Roles(Role.USER)
  @Get()
  async getContainers(): Promise<Container[]> {
    return this.containersService.getContainers();
  }

  @Roles(Role.USER)
  @Delete(':id')
  async deleteContainer(@Param('id') id: string): Promise<Container> {
    return this.containersService.deleteContainer(id);
  }
}
