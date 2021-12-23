import { getRepository, Repository } from 'typeorm';

import { Group } from '../../entities/Group';
import { CreateGroupDTO } from '../../useCases/createGroup/CreateGroupDTO';
import { IGroupsRepository } from '../IGroupsRepository';

class GroupsRepository implements IGroupsRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = getRepository(Group);
  }

  async create(group: CreateGroupDTO): Promise<void> {
    const newGroup = this.repository.create(group);

    await this.repository.save(newGroup);

    return;
  }

  async findByGroup(group: string): Promise<Group> {
    const searchGroup = await this.repository.findOne({ group });

    return searchGroup;
  }
}

export { GroupsRepository };
