import { inject, injectable } from 'tsyringe';

import { CreateJobPositionDTO } from './CreateJobPositionDTO';
import { IJobPositionsRepository } from '../../repositories/IJobPositionsRepository';

@injectable()
class CreateJobPositionUseCase {
  constructor(
    @inject('JobPositionsRepository')
    private jobPositionsRepository: IJobPositionsRepository
  ) {}

  async execute(jobPositionData: CreateJobPositionDTO): Promise<void> {
    await this.jobPositionsRepository.create(jobPositionData);

    return;
  }
}

export { CreateJobPositionUseCase };
