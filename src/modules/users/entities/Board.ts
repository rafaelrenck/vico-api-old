import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('boards')
class Board {
  @PrimaryColumn()
  id: string;

  @Column({ length: 8, unique: true })
  initials: string;

  @Column({ unique: true })
  board: string;

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

export { Board };
