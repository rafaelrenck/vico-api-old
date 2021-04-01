import { container } from 'tsyringe';

import { IStatesRepository } from '../../modules/locations/repositories/IStatesRepository';
import { StatesRepository } from '../../modules/locations/repositories/implementations/StatesRepository';

import { IUsersRepository } from '../../modules/workers/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/workers/repositories/implementations/UsersRepository';

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
