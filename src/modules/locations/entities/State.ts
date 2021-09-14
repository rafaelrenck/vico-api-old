import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('states')
class State {
  @PrimaryColumn()
  id: string;

  @Column({ length: 2, unique: true })
  initials: string;

  @Column({ unique: true })
  state: string;

  @Column({ default: true })
  active: boolean;

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

export { State };
