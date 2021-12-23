import { Group } from '../entities/Group';
import { CreateGroupDTO } from '../useCases/createGroup/CreateGroupDTO';

interface IGroupsRepository {
  create(data: CreateGroupDTO): Promise<void>;
  findByGroup(group: string): Promise<Group>;
}

export { IGroupsRepository };
