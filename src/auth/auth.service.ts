import { User } from '@app/entities';
import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  signUp(email: string, password: string) {
    return this.userRepository.insert({
      email,
      password: bcrypt.hashSync(password, 10),
    });
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });

      if (bcrypt.compareSync(password, user.password)) {
        return {
          accessToken: this.jwtService.sign({ id: user.id, email: user.email, admin: user.admin }),
        };
      } else {
        throw '';
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
