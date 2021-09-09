import { getRepository, Repository } from 'typeorm';

import { Role } from '../../entities/Role';
import { CreateRoleDTO } from '../../useCases/createRole/CreateRoleDTO';
import { IRolesRepository } from '../IRolesRepository';

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async create(roleData: CreateRoleDTO): Promise<void> {
    const newRole = this.repository.create(roleData);

    await this.repository.save(newRole);

    return;
  }
}

export { RolesRepository };
