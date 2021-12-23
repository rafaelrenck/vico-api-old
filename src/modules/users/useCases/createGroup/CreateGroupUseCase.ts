import { inject, injectable } from 'tsyringe';

import { CreateGroupDTO } from './CreateGroupDTO';
import { IGroupsRepository } from '../../repositories/IGroupsRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateGroupUseCase {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository
  ) {}

  async execute(group: CreateGroupDTO): Promise<void> {
    const groupExists = await this.groupsRepository.findByGroup(group.group);

    if (groupExists) {
      throw new AppError('Group already exists', 409);
    }

    await this.groupsRepository.create(group);

    return;
  }
}

export { CreateGroupUseCase };
