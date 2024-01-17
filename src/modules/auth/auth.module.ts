import { JwtModule } from '@nestjs/jwt';
import { TYPES } from '../../core/tokens/types';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceImpl } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module, Provider } from '@nestjs/common';

const auth: Provider = {
  provide: TYPES.services.AuthService,
  useClass: AuthServiceImpl,
};

@Module({
  imports: [JwtModule.register({})],
  providers: [auth, JwtStrategy],
  exports: [auth],
  controllers: [AuthController],
})
export class AuthModule {}
