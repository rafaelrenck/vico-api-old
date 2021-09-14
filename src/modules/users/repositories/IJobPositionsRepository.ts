import { JobPosition } from '../entities/JobPosition';
import { CreateJobPositionDTO } from '../useCases/createJobPosition/CreateJobPositionDTO';

interface IJobPositionsRepository {
  create(data: CreateJobPositionDTO): Promise<void>;
  findByJobPosition(jobPosition: string): Promise<JobPosition>;
}

export { IJobPositionsRepository };
