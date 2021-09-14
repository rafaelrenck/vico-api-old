import { Board } from '../entities/Board';
import { CreateBoardDTO } from '../useCases/createBoard/CreateBoardDTO';

interface IBoardsRepository {
  create(data: CreateBoardDTO): Promise<void>;
  findByInitials(initials: string): Promise<Board>;
  findByBoard(board: string): Promise<Board>;
}

export { IBoardsRepository };
