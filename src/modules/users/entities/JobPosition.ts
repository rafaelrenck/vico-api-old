import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { v4 as uuid } from 'uuid';

@Entity('job_positions')
class JobPosition {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  job_position: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.jobPosition)
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

export { JobPosition };
