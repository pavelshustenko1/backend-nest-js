import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  imports: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
