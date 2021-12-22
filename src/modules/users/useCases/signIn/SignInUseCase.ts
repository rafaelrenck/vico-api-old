import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { SignInDTO } from './SignInDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

interface IResponse {
  user: {
    fullName: string;
    shortName: string;
  };
  token: string;
}

@injectable()
class SignInUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, password }: SignInDTO): Promise<IResponse> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (!userExists) {
      throw new AppError('Incorrect username or password', 406);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect username or password', 406);
    }

    const token = sign({}, <string>process.env.APP_SECRET, {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return {
      user: {
        fullName: userExists.fullName,
        shortName: userExists.shortName,
      },
      token,
    };
  }
}

export { SignInUseCase };
