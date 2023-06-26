import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/entities';
import { Repository } from 'typeorm';
import { Pagination } from 'src/helpers/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const { name, userId } = createPostDto;

    return this.postRepository.insert({
      name,
      user: {
        id: userId,
      },
    });
  }

  find({ limit, page }: Pagination) {
    return this.postRepository.find({
      take: limit,
      skip: limit * page,
    });
  }

  findOne(id: string) {
    return this.postRepository.findOne({ where: { id } });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const { name, userId } = updatePostDto;
    return this.postRepository.update(id, { name, user: { id: userId } });
  }

  remove(id: string) {
    return this.postRepository.softDelete(id);
  }
}
