import { inject, injectable } from 'tsyringe';

import { CreateRoleDTO } from './CreateRoleDTO';
import { IRolesRepository } from '../../repositories/IRolesRepository';

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  async execute(roleData: CreateRoleDTO): Promise<void> {
    await this.rolesRepository.create(roleData);

    return;
  }
}

export { CreateRoleUseCase };
