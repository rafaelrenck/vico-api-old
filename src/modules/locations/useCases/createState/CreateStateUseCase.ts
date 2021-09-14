import { inject, injectable } from 'tsyringe';

import { CreateStateDTO } from './CreateStateDTO';
import { IStatesRepository } from '../../repositories/IStatesRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateStateUseCase {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(stateData: CreateStateDTO): Promise<void> {
    const initialsAlreadyInUse = await this.statesRepository.findByInitials(
      stateData.initials
    );

    if (initialsAlreadyInUse) {
      throw new AppError('Initials already in use', 409);
    }

    const stateAlreadyExists = await this.statesRepository.findByState(
      stateData.state
    );

    if (stateAlreadyExists) {
      throw new AppError('State already exists', 409);
    }

    await this.statesRepository.create(stateData);

    return;
  }
}

export { CreateStateUseCase };
