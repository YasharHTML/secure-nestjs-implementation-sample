import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
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
import { CaslAbilityFactory } from 'src/auth/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/constants/Action.enum';
import { Post as _Post } from '@app/entities';
import { PolicyGuard } from 'src/auth/policy/policy.guard';
import { CheckPolicies } from 'src/helpers/policy_handler.interface';

@Controller({ path: 'post', version: '1' })
@ApiTags('post')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @Post()
  @UseGuards(PolicyGuard)
  @CheckPolicies((handler) => handler.can(Action.Create, _Post))
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(PolicyGuard)
  @CheckPolicies((handler) => handler.can(Action.Read, _Post))
  find(
    @Query({
      transform: (value) => ({ limit: +value.limit, page: +value.page }),
    })
    { limit, page }: Pagination,
  ) {
    return this.postService.find({ limit, page });
  }

  @Get(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies((handler) => handler.can(Action.Read, _Post))
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies((handler) => handler.can(Action.Update, _Post))
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies((handler) => handler.can(Action.Delete, _Post))
  async remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
