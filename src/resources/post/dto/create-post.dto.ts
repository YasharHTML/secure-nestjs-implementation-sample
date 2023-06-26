import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty()
  userId: string;
}
