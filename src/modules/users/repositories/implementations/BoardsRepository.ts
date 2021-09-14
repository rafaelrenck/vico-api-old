import { getRepository, Repository } from 'typeorm';

import { Board } from '../../entities/Board';
import { CreateBoardDTO } from '../../useCases/createBoard/CreateBoardDTO';
import { IBoardsRepository } from '../IBoardsRepository';

class BoardsRepository implements IBoardsRepository {
  private repository: Repository<Board>;

  constructor() {
    this.repository = getRepository(Board);
  }

  async create(boardData: CreateBoardDTO): Promise<void> {
    const newBoard = this.repository.create(boardData);

    await this.repository.save(newBoard);

    return;
  }

  async findByInitials(initials: string): Promise<Board> {
    const searchBoard = await this.repository.findOne({ initials });

    return searchBoard;
  }

  async findByBoard(board: string): Promise<Board> {
    const searchBoard = await this.repository.findOne({ board });

    return searchBoard;
  }
}

export { BoardsRepository };
