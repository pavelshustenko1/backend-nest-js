import { ConsoleLogger, LoggerService } from '@nestjs/common';

export type GetTraceFn = () => {
  traceId: string;
  spanId: string;
  traceSampled?: boolean;
};
export type WinstonCloudRunConfig = {
  production: boolean;
  getTrace?: GetTraceFn;
};

export function createLogger(): LoggerService {
  if (process.env.LOG_TRANSPORT === 'NEST_DEFAULT') {
    return new ConsoleLogger();
  }
}
