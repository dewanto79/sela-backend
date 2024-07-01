import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          errorCode: 'UNAUTHORIZED',
          message: 'UNAUTHORIZED',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
