import { InternalDataServices } from './services/internal-data-services.service';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { Module, Provider } from '@nestjs/common';

const internalData: Provider = {
  provide: IDataServices,
  useClass: InternalDataServices,
};

@Module({
  imports: [],
  providers: [internalData],
  exports: [internalData],
})
export class InternalDataServicesModule {}
