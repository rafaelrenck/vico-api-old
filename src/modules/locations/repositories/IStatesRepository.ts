import { State } from '../entities/State';
import { CreateStateDTO } from '../useCases/createState/CreateStateDTO';

interface IStatesRepository {
  create(data: CreateStateDTO): Promise<void>;
  findByInitials(initials: string): Promise<State>;
  findByState(state: string): Promise<State>;
}

export { IStatesRepository };
