import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class Pagination {
  @Transform(({value}) => Number(value))
  @IsNumber()
  @ApiProperty()
  page: number;

  @Transform(({value}) => Number(value))
  @IsNumber()
  @ApiProperty()
  limit: number;
}
