import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Pagination } from 'src/helpers/pagination.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { User } from 'src/decorators/User.decorator';
import { Action } from 'src/constants/Action.enum';
import { Post as _Post } from '@app/entities';

@Controller('post')
@ApiTags('post')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @Post()
  create(@User() user: any, @Body() createPostDto: CreatePostDto) {
    if (this.casl.createForUser(user).can(Action.Create, _Post))
      return this.postService.create(createPostDto);
    throw new ForbiddenException();
  }

  @Get()
  find(
    @User() user: any,
    @Query({
      transform: (value) => ({ limit: +value.limit, page: +value.page }),
    })
    { limit, page }: Pagination,
  ) {
    if (this.casl.createForUser(user).can(Action.Read, _Post))
      return this.postService.find({ limit, page });
    throw new ForbiddenException();
  }

  @Get(':id')
  findOne(@User() user: any, @Param('id') id: string) {
    if (this.casl.createForUser(user).can(Action.Read, _Post))
      return this.postService.findOne(id);
    throw new ForbiddenException();
  }

  @Put(':id')
  update(
    @User() user: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    if (this.casl.createForUser(user).can(Action.Update, _Post))
      return this.postService.update(id, updatePostDto);
    throw new ForbiddenException();
  }

  @Delete(':id')
  remove(@User() user: any, @Param('id') id: string) {
    if (this.casl.createForUser(user).can(Action.Create, _Post))
      return this.postService.remove(id);
    throw new ForbiddenException();
  }
}
