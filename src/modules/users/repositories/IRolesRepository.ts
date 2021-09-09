import { CreateRoleDTO } from '../useCases/createRole/CreateRoleDTO';

interface IRolesRepository {
  create(data: CreateRoleDTO): Promise<void>;
}

export { IRolesRepository };
