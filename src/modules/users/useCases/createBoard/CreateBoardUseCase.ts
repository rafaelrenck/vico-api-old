import { inject, injectable } from 'tsyringe';

import { CreateBoardDTO } from './CreateBoardDTO';
import { IBoardsRepository } from '../../repositories/IBoardsRepository';

@injectable()
class CreateBoardUseCase {
  constructor(
    @inject('BoardsRepository')
    private boardsRepository: IBoardsRepository
  ) {}

  async execute(boardData: CreateBoardDTO): Promise<void> {
    await this.boardsRepository.create(boardData);

    return;
  }
}

export { CreateBoardUseCase };
