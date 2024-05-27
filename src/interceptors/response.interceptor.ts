import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),

      catchError((error: HttpException) => {
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let errorData = 'INTERNAL_SERVER_ERROR';
        let message = error.message;
        if (statusCode != HttpStatus.INTERNAL_SERVER_ERROR) {
          const errDetail = error.getResponse();

          if (typeof errDetail === 'object') {
            errorData = Object(errDetail)['errorCode'];
            message = Object(errDetail)['message'].toString();
          } else {
            errorData = errDetail;
          }
        }

        return throwError(
          () =>
            new HttpException(
              {
                status: false,
                statusCode: statusCode,
                message: message,
                result: errorData,
              },
              error.getStatus(),
              { cause: error },
            ),
        );
      }),
    );
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = response?.statusCode;

    return {
      status: true,
      statusCode,
      result: res,
      message: response?.message,
    };
  }
}
