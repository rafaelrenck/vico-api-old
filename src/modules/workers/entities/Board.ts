import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { State } from '../../locations/entities/State';
import { v4 as uuid } from 'uuid';

@Entity('boards')
@Unique('board_unique', ['board', 'state'])
class Board {
  @PrimaryColumn()
  id: string;

  @Column()
  board: string;

  @ManyToOne(() => State)
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null = null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Board };
