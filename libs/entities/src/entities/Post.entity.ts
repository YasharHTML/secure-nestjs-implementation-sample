import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;
}
