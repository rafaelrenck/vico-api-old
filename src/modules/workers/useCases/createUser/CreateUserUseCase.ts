import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from './CreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userData: CreateUserDTO): Promise<void> {
    await this.usersRepository.create(userData);

    return;
  }
}

export { CreateUserUseCase };
