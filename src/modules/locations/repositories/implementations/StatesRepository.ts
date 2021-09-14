import { getRepository, Repository } from 'typeorm';

import { State } from '../../entities/State';
import { CreateStateDTO } from '../../useCases/createState/CreateStateDTO';
import { IStatesRepository } from '../IStatesRepository';

class StatesRepository implements IStatesRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async create(stateData: CreateStateDTO): Promise<void> {
    const newState = this.repository.create(stateData);

    await this.repository.save(newState);

    return;
  }

  async findByInitials(initials: string): Promise<State> {
    const searchState = await this.repository.findOne({ initials });

    return searchState;
  }

  async findByState(state: string): Promise<State> {
    const searchState = await this.repository.findOne({ state });

    return searchState;
  }
}

export { StatesRepository };
