import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { CreateUserDTO } from './CreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userData: CreateUserDTO): Promise<void> {
    if (userData.email) {
      const emailAlreadyTaken = await this.usersRepository.findByEmail(
        userData.email
      );

      if (emailAlreadyTaken) {
        throw new AppError('E-mail already taken', 409);
      }
    }

    if (userData.rg) {
      const rgAlreadyInUse = await this.usersRepository.findByRG(userData.rg);

      if (rgAlreadyInUse) {
        throw new AppError('RG already in use', 409);
      }
    }

    if (userData.cpf) {
      const cpfAlreadyInUse = await this.usersRepository.findByCPF(
        userData.cpf
      );

      if (cpfAlreadyInUse) {
        throw new AppError('CPF already in use', 409);
      }
    }

    if (userData.pis) {
      const pisAlreadyInUse = await this.usersRepository.findByPIS(
        userData.pis
      );

      if (pisAlreadyInUse) {
        throw new AppError('PIS already in use', 409);
      }
    }

    const usernameAlreadyTaken = await this.usersRepository.findByUsername(
      userData.username
    );

    if (usernameAlreadyTaken) {
      throw new AppError('Username already taken', 409);
    }

    if (userData.dateOfBirth) {
      const userAlreadyExists = await this.usersRepository.findByFullNameAndDateOfBirth(
        userData.fullName,
        userData.dateOfBirth
      );

      if (userAlreadyExists) {
        throw new AppError('User already exists', 409);
      }
    }

    if (userData.board && userData.boardState && userData.boardRegistry) {
      const boardRegistryAlreadyExists = await this.usersRepository.findByBoardRegistry(
        userData.board,
        userData.boardState,
        userData.boardRegistry
      );

      if (boardRegistryAlreadyExists) {
        throw new AppError('Board registry already taken', 409);
      }
    }

    const passwordHash = await hash(userData.password, 8);

    const newUser = { ...userData, password: passwordHash };

    await this.usersRepository.create(newUser);

    return;
  }
}

export { CreateUserUseCase };
