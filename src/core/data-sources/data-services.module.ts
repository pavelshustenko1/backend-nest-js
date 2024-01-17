import { InternalDataServicesModule } from './internal/internal-data-services.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [InternalDataServicesModule],
  exports: [InternalDataServicesModule],
})
export class DataServicesModule {}
