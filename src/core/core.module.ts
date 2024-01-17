import { Global, Module, Provider } from '@nestjs/common';
import { DatabaseServiceImpl } from './database/database.service';
import { TYPES } from './tokens/types';

const DATA_BASE_PROVIDER: Provider = {
  provide: TYPES.services.DatabaseService,
  useClass: DatabaseServiceImpl,
};

const PROVIDERS: Provider[] = [DATA_BASE_PROVIDER];

@Global()
@Module({
  imports: [],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class CoreModule {}
