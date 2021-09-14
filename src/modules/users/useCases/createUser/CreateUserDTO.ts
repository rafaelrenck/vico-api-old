import { UserGender, UserType } from '../../entities/User';

interface CreateUserDTO {
  full_name: string;
  short_name: string;
  type: UserType;
  email?: string;
  phone?: string;
  date_of_birth?: Date;
  show_birthday?: boolean;
  gender?: UserGender;
  rg?: string;
  cpf?: string;
  pis?: string;
  job_position: string;
  board?: string;
  board_state?: string;
  board_registry?: string;
  username: string;
  password: string;
}

export { CreateUserDTO };
