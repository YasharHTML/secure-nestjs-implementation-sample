import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from 'src/decorators/User.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() { email, password }: { email: string; password: string }) {
    return this.authService.signUp(email, password).catch(() => {
      throw new ConflictException();
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() { email, password }: { email: string; password: string }) {
    return this.authService.signIn(email, password).catch(() => {
      throw new UnauthorizedException();
    });
  }

  @UseGuards(AuthGuard)
  @Get('/test')
  testAuth(@User() user: { email: string; id: string }) {
    return user;
  }
}
