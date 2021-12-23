import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';
import { Group } from '../../entities/Group';

interface IResponse {
  fullName: string;
  shortName: string;
  groups: Group[];
}

@injectable()
class MyProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('This user does not exists', 406);
    }

    return {
      fullName: user.fullName,
      shortName: user.shortName,
      groups: user.groups,
    };
  }
}

export { MyProfileUseCase };
