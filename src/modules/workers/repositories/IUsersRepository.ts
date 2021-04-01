import { CreateUserDTO } from '../useCases/createUser/CreateUserDTO';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>;
}

export { IUsersRepository };
