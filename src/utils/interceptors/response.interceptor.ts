import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseType } from 'src/types';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseType<T, never>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseType<T, never>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        if (
          data &&
          typeof data === 'object' &&
          'okay' in data &&
          'statusCode' in data
        ) {
          return data;
        }

        return {
          okay: true,
          message: data,
          statusCode,
        };
      }),
    );
  }
}
