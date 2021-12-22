import { User } from '../entities/User';
import { CreateUserDTO } from '../useCases/createUser/CreateUserDTO';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByRG(rg: string): Promise<User>;
  findByCPF(cpf: string): Promise<User>;
  findByPIS(pis: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByFullNameAndDateOfBirth(
    fullName: string,
    dateOfBirth: string
  ): Promise<User>;
  findByBoardRegistry(
    board: string,
    boardState: string,
    boardRegistry: string
  ): Promise<User>;
}

export { IUsersRepository };
