import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { isArray, isEmpty, isString } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        const request: Request = context.switchToHttp().getRequest();

        return throwError(() => {
          let message: string;
          if (err?.message) {
            message = err?.message;
          }

          if (err?.detail) {
            message = err?.detail;
          }

          if (err?.response) {
            if (isString(err?.response?.message)) {
              message = err?.response?.message;
            }
            if (
              !isEmpty(err?.response?.message) &&
              isArray(err?.response?.message)
            ) {
              message = err?.response?.message[0];
            }
          }

          Logger.error(
            `Request to [${request.url}] failed with message: [${message}]`,
          );

          return new HttpException(
            {
              message: message ?? 'Something went wrong',
              timestamp: new Date().toISOString(),
              route: request.path,
              method: request.method,
            },
            err.statusCode || 500,
          );
        });
      }),
    );
  }
}
