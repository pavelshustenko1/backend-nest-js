import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  Post,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { TYPES } from '../../../core/tokens/types';
import { ThingsService } from '../interfaces/things-service.interface';
import { Thing } from '../types/thing.type';
import { ThingDto } from '../dtos/thing.dto';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enum/roles.enum';

@Controller('things')
@UseInterceptors(ClassSerializerInterceptor)
export class ThingsController {
  constructor(
    @Inject(TYPES.services.ThingsService)
    private thingsService: ThingsService,
  ) {}

  @Roles(Role.USER)
  @Post()
  async createThing(@Body() dto: ThingDto): Promise<Thing> {
    return this.thingsService.createThing(dto);
  }

  @Roles(Role.USER)
  @Get()
  async getThings(): Promise<Thing[]> {
    return this.thingsService.getThings();
  }

  @Roles(Role.USER)
  @Delete(':id')
  async deleteThing(@Param('id') id: string): Promise<Thing> {
    return this.thingsService.deleteThing(id);
  }
}
