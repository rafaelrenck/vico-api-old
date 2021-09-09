import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { CreateUserDTO } from './CreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userData: CreateUserDTO): Promise<void> {
    const passwordHash = await hash(userData.password, 8);

    const user = { ...userData, password: passwordHash };

    await this.usersRepository.create(user);

    return;
  }
}

export { CreateUserUseCase };
