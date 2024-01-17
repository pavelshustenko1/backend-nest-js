import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  Body,
  Post,
} from '@nestjs/common';
import { TYPES } from '../../../core/tokens/types';
import { ActionsService } from '../interfaces/actions-service.interface';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enum/roles.enum';
import { ActionDto } from '../dtos/action.dto';
import { Container } from '../../containers/types/container.type';

@Controller('actions')
@UseInterceptors(ClassSerializerInterceptor)
export class ActtionsController {
  constructor(
    @Inject(TYPES.services.ActionsService)
    private actionsService: ActionsService,
  ) {}

  @Roles(Role.USER)
  @Post()
  async putThingInsideContainer(@Body() dto: ActionDto): Promise<Container> {
    return this.actionsService.putThingInsideContainer(dto);
  }

  @Roles(Role.USER)
  @Post('remove')
  async removeThingFromContainer(@Body() dto: ActionDto): Promise<Container> {
    return this.actionsService.removeThingFromContainer(dto);
  }
}
