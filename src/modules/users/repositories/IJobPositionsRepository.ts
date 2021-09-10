import { CreateJobPositionDTO } from '../useCases/createJobPosition/CreateJobPositionDTO';

interface IJobPositionsRepository {
  create(data: CreateJobPositionDTO): Promise<void>;
}

export { IJobPositionsRepository };
