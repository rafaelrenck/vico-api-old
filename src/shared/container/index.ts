import { container } from 'tsyringe';

import { IStatesRepository } from '../../modules/locations/repositories/IStatesRepository';
import { StatesRepository } from '../../modules/locations/repositories/implementations/StatesRepository';

import { IRolesRepository } from '../../modules/workers/repositories/IRolesRepository';
import { RolesRepository } from '../../modules/workers/repositories/implementations/RolesRepository';

import { IUsersRepository } from '../../modules/workers/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/workers/repositories/implementations/UsersRepository';

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
