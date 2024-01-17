import { Module, Provider } from '@nestjs/common';
import { TYPES } from '../../core/tokens/types';
import { ActionsServiceImpl } from './services/actions.service';
import { ActtionsController } from './controllers/actions.controller';

const actionsService: Provider = {
  provide: TYPES.services.ActionsService,
  useClass: ActionsServiceImpl,
};

@Module({
  controllers: [ActtionsController],
  imports: [],
  providers: [actionsService],
  exports: [],
})
export class UsersModule {}
