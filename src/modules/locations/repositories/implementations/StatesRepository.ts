import { getRepository, Repository } from 'typeorm';

import { State } from '../../entities/State';
import { CreateStateDTO } from '../../useCases/createState/CreateStateDTO';
import { IStatesRepository } from '../IStatesRepository';

class StatesRepository implements IStatesRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async create(userData: CreateStateDTO): Promise<void> {
    const newState = this.repository.create(userData);

    await this.repository.save(newState);

    return;
  }
}

export { StatesRepository };
