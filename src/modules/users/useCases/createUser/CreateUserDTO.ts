import { UserGender, UserType } from '../../entities/User';

interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  date_of_birth: Date;
  gender: UserGender;
  rg?: string;
  cpf: string;
  pis?: string;
  type: UserType;
  role: string;
  board?: string;
  board_registry?: string;
}

export { CreateUserDTO };
