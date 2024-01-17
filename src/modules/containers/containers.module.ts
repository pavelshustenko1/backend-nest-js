import { ContainersController } from './controllers/containers.controller';
import { ContainersServiceImpl } from './services/containers.service';
import { Module, Provider } from '@nestjs/common';
import { TYPES } from '../../core/tokens/types';

const containerService: Provider = {
  provide: TYPES.services.ContainersService,
  useClass: ContainersServiceImpl,
};

@Module({
  controllers: [ContainersController],
  imports: [],
  providers: [containerService],
  exports: [],
})
export class ContainerModule {}
