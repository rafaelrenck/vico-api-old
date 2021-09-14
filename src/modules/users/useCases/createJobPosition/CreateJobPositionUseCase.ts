import { inject, injectable } from 'tsyringe';

import { CreateJobPositionDTO } from './CreateJobPositionDTO';
import { IJobPositionsRepository } from '../../repositories/IJobPositionsRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateJobPositionUseCase {
  constructor(
    @inject('JobPositionsRepository')
    private jobPositionsRepository: IJobPositionsRepository
  ) {}

  async execute(jobPositionData: CreateJobPositionDTO): Promise<void> {
    const jobPositionAlreadyExists = await this.jobPositionsRepository.findByJobPosition(
      jobPositionData.jobPosition
    );

    if (jobPositionAlreadyExists) {
      throw new AppError('Job position already exists', 409);
    }

    await this.jobPositionsRepository.create(jobPositionData);

    return;
  }
}

export { CreateJobPositionUseCase };
