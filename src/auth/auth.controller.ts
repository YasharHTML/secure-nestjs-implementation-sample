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
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() { email, password }: AuthDto) {
    return this.authService.signUp(email, password).catch(() => {
      throw new ConflictException();
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() { email, password }: AuthDto) {
    return this.authService.signIn(email, password).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
