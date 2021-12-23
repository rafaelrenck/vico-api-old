import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('groups')
class Group {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  group: string;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null = null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Group };
