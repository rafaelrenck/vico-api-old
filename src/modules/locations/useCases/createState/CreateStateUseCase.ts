import { inject, injectable } from 'tsyringe';

import { CreateStateDTO } from './CreateStateDTO';
import { IStatesRepository } from '../../repositories/IStatesRepository';

@injectable()
class CreateStateUseCase {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(stateData: CreateStateDTO): Promise<void> {
    await this.statesRepository.create(stateData);

    return;
  }
}

export { CreateStateUseCase };
