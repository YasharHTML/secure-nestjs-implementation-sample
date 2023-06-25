import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validate(context.switchToHttp().getRequest());
  }

  private async validate(request: Request) {
    const header = request.headers.authorization;

    if (!header) {
      throw new ForbiddenException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(header.split(' ')[1]);

      request['user'] = payload;
    } catch (error) {
      throw new ForbiddenException();
    }

    return true;
  }
}
