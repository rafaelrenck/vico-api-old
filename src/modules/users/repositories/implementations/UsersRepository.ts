import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { CreateUserDTO } from '../../useCases/createUser/CreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(userData: CreateUserDTO): Promise<void> {
    const newUser = this.repository.create(userData);

    await this.repository.save(newUser);

    return;
  }
}

export { UsersRepository };
