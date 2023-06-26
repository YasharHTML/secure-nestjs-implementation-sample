import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/entities';
import { CaslModule } from 'src/auth/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CaslModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
