import { getRepository, Repository } from 'typeorm';

import { JobPosition } from '../../entities/JobPosition';
import { CreateJobPositionDTO } from '../../useCases/createJobPosition/CreateJobPositionDTO';
import { IJobPositionsRepository } from '../IJobPositionsRepository';

class JobPositionsRepository implements IJobPositionsRepository {
  private repository: Repository<JobPosition>;

  constructor() {
    this.repository = getRepository(JobPosition);
  }

  async create(jobPositionData: CreateJobPositionDTO): Promise<void> {
    const newJobPosition = this.repository.create(jobPositionData);

    await this.repository.save(newJobPosition);

    return;
  }

  async findByJobPosition(jobPosition: string): Promise<JobPosition> {
    const searchJobPosition = await this.repository.findOne({ jobPosition });

    return searchJobPosition;
  }
}

export { JobPositionsRepository };
