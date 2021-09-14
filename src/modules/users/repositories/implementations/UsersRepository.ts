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

  async findByEmail(email: string): Promise<User> {
    const searchUser = await this.repository.findOne({ email });

    return searchUser;
  }

  async findByRG(rg: string): Promise<User> {
    const searchUser = await this.repository.findOne({ rg });

    return searchUser;
  }

  async findByCPF(cpf: string): Promise<User> {
    const searchUser = await this.repository.findOne({ cpf });

    return searchUser;
  }

  async findByPIS(pis: string): Promise<User> {
    const searchUser = await this.repository.findOne({ pis });

    return searchUser;
  }

  async findByUsername(username: string): Promise<User> {
    const searchUser = await this.repository.findOne({ username });

    return searchUser;
  }

  async findByFullNameAndDateOfBirth(
    fullName: string,
    dateOfBirth: string
  ): Promise<User> {
    const searchUser = await this.repository.findOne({ fullName, dateOfBirth });

    return searchUser;
  }

  async findByBoardRegistry(
    board: string,
    boardState: string,
    boardRegistry: string
  ): Promise<User> {
    const searchBoardRegistry = await this.repository.findOne({
      board,
      boardState,
      boardRegistry,
    });

    return searchBoardRegistry;
  }
}

export { UsersRepository };
