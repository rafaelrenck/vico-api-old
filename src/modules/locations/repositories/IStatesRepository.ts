import { CreateStateDTO } from '../useCases/createState/CreateStateDTO';

interface IStatesRepository {
  create(data: CreateStateDTO): Promise<void>;
}

export { IStatesRepository };
