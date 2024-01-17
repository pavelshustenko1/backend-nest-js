import { ConfigurationModule } from './core/configuration/configuration.module';
import { ContainerModule } from './modules/containers/containers.module';
import { ThingsModule } from './modules/things/things.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { AppService } from './app.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { DataServicesModule } from './core/data-sources/data-services.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';
import { TokenMiddleware } from './core/middlewares/token.middleware';

const ROLE_GUARD: Provider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

@Module({
  imports: [
    ConfigurationModule,
    JwtModule,
    AuthModule,
    CoreModule,
    UsersModule,
    ThingsModule,
    ContainerModule,
    DataServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ROLE_GUARD],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
