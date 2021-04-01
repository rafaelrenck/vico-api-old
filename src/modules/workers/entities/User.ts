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
import { Role } from './Role';
import { Board } from './Board';
import { v4 as uuid } from 'uuid';

export enum UserGender {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
  NAOINFORMADO = 'Não Informado',
}

export enum UserType {
  FUNCIONARIO = 'Funcionário',
  PRESTADOR = 'Prestador',
  AMBOS = 'Ambos',
}

@Entity('users')
@Unique('name_unique', ['name', 'date_of_birth'])
@Unique('board_unique', ['board', 'board_registry'])
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  password_is_temporary: boolean;

  @Column({ unique: true, nullable: true })
  email: string | null = null;

  @Column({ default: true })
  expose_email: boolean;

  @Column({ nullable: true })
  phone: string | null = null;

  @Column({ default: true })
  expose_phone: boolean;

  @Column()
  date_of_birth: Date;

  @Column({ default: true })
  expose_birthday: boolean;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.NAOINFORMADO,
  })
  gender: UserGender;

  @Column({ unique: true, nullable: true })
  rg: string | null = null;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  pis: string | null = null;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.FUNCIONARIO,
  })
  type: UserType;

  @ManyToOne(() => Role)
  role: string;

  @ManyToOne(() => Board)
  board: string;

  @Column({ nullable: true })
  board_registry: string | null = null;

  @Column({ nullable: true })
  digital_sign: string | null = null;

  @Column({ type: 'text', nullable: true })
  text_sign: string | null = null;

  @Column({ nullable: true })
  photo: string | null = null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null = null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
