import { Module, Provider } from '@nestjs/common';
import { TYPES } from '../../core/tokens/types';
import { ThingsServiceImpl } from './services/things.service';
import { ThingsController } from './controllers/things.controller';

const thingService: Provider = {
  provide: TYPES.services.ThingsService,
  useClass: ThingsServiceImpl,
};

@Module({
  controllers: [ThingsController],
  imports: [],
  providers: [thingService],
  exports: [],
})
export class ThingsModule {}
