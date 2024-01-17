import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createLogger } from './core/logger/logger.factory';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: createLogger(),
    bodyParser: false,
  });

  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.useLogger(createLogger());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT || 3001;
  await app.listen(port);

  Logger.log(`Backend service started on port: ${port}`);
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
