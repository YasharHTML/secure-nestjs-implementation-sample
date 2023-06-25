import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Post } from './Post.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  admin: boolean;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];
}
