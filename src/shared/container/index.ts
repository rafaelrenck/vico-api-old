import { container } from 'tsyringe';

import { IStatesRepository } from '../../modules/locations/repositories/IStatesRepository';
import { StatesRepository } from '../../modules/locations/repositories/implementations/StatesRepository';

import { IBoardsRepository } from '../../modules/users/repositories/IBoardsRepository';
import { BoardsRepository } from '../../modules/users/repositories/implementations/BoardsRepository';

import { IJobPositionsRepository } from '../../modules/users/repositories/IJobPositionsRepository';
import { JobPositionsRepository } from '../../modules/users/repositories/implementations/JobPositionsRepository';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository
);

container.registerSingleton<IBoardsRepository>(
  'BoardsRepository',
  BoardsRepository
);

container.registerSingleton<IJobPositionsRepository>(
  'JobPositionsRepository',
  JobPositionsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
