import { UserGender, UserType } from '../../entities/User';

interface CreateUserDTO {
  fullName: string;
  shortName: string;
  type: UserType;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  showBirthday?: boolean;
  gender?: UserGender;
  rg?: string;
  cpf?: string;
  pis?: string;
  jobPosition: string;
  board?: string;
  boardState?: string;
  boardRegistry?: string;
  username: string;
  password: string;
}

export { CreateUserDTO };
