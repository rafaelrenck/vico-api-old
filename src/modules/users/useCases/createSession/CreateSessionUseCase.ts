import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateSessionDTO } from '../createSession/CreateSessionDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CreateSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(sessionData: CreateSessionDTO): Promise<IResponse> {
    const userExists = await this.usersRepository.findByUsername(
      sessionData.username
    );

    if (!userExists) {
      throw new AppError('Incorrect username or password', 406);
    }

    const passwordMatch = await compare(
      sessionData.password,
      userExists.password
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect username or password', 406);
    }

    const token = sign({}, <string>process.env.APP_SECRET, {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return {
      user: { name: userExists.fullName, email: userExists.email },
      token,
    };
  }
}

export { CreateSessionUseCase };
