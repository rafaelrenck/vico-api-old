import { CreateBoardDTO } from '../useCases/createBoard/CreateBoardDTO';

interface IBoardsRepository {
  create(data: CreateBoardDTO): Promise<void>;
}

export { IBoardsRepository };
