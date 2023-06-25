import { Post, User } from '@app/entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig: () => TypeOrmModuleOptions = () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [User, Post],
  synchronize: process.env.DB_SYNC === "1" ? true : false,
});
