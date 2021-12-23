import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  Unique,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Board } from './Board';
import { JobPosition } from './JobPosition';
import { State } from '../../locations/entities/State';
import { v4 as uuid } from 'uuid';
import { Group } from './Group';

export enum UserType {
  EMPLOYEE = 'Funcionário',
  PROVIDER = 'Prestador',
  BOTH = 'Ambos',
}

export enum UserGender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  UNKNOWN = 'Não Informado',
}

@Entity('users')
@Unique('nameUnique', ['fullName', 'dateOfBirth'])
@Unique('boardUnique', ['board', 'boardState', 'boardRegistry'])
class User {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'short_name' })
  shortName: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({ unique: true, nullable: true })
  email: string | null = null;

  @Column({ nullable: true })
  phone: string | null = null;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: string | null = null;

  @Column({ name: 'show_birthday', default: true })
  showBirthday: boolean;

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

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.users)
  @JoinColumn({ name: 'job_position_id' })
  jobPosition: string;

  @ManyToOne(() => Board, { nullable: true })
  @JoinColumn({ name: 'board_id' })
  board: string;

  @ManyToOne(() => State, { nullable: true })
  @JoinColumn({ name: 'board_state_id' })
  boardState: string;

  @Column({ name: 'board_registry', nullable: true })
  boardRegistry: string | null = null;

  @Column({ name: 'digital_sign', nullable: true })
  digitalSign: string | null = null;

  @Column({ name: 'text_sign', type: 'text', nullable: true })
  textSign: string | null = null;

  @Column({ nullable: true })
  photo: string | null = null;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ name: 'password_is_temporary', default: true })
  passwordIsTemporary: boolean;

  @Column({ name: 'bad_logins', default: 0 })
  badLogins: number;

  @Column({ default: false })
  blocked: boolean;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];

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

export { User };
