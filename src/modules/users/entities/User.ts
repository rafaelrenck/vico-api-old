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
import { Board } from './Board';
import { JobPosition } from './JobPosition';
import { State } from '../../locations/entities/State';
import { v4 as uuid } from 'uuid';

export enum UserGender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  UNKNOWN = 'Não Informado',
}

export enum UserType {
  EMPLOYEE = 'Funcionário',
  PROVIDER = 'Prestador',
  BOTH = 'Ambos',
}

@Entity('users')
@Unique('name_unique', ['full_name', 'date_of_birth'])
@Unique('board_unique', ['board_id', 'board_state_id', 'board_registry'])
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  short_name: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({ unique: true, nullable: true })
  email: string | null = null;

  @Column({ nullable: true })
  phone: string | null = null;

  @Column({ nullable: true })
  date_of_birth: Date | null = null;

  @Column({ default: true })
  show_birthday: boolean;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.UNKNOWN,
  })
  gender: UserGender;

  @Column({ unique: true, nullable: true })
  rg: string | null = null;

  @Column({ unique: true, nullable: true })
  cpf: string | null = null;

  @Column({ unique: true, nullable: true })
  pis: string | null = null;

  @ManyToOne(() => JobPosition)
  job_position_id: string;

  @ManyToOne(() => Board, { nullable: true })
  board_id: string;

  @ManyToOne(() => State, { nullable: true })
  board_state_id: string;

  @Column({ nullable: true })
  board_registry: string | null = null;

  @Column({ nullable: true })
  digital_sign: string | null = null;

  @Column({ type: 'text', nullable: true })
  text_sign: string | null = null;

  @Column({ nullable: true })
  photo: string | null = null;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  password_is_temporary: boolean;

  @Column({ default: 0 })
  bad_logins: number;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date | null = null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
