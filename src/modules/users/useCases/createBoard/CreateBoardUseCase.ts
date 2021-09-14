import { inject, injectable } from 'tsyringe';

import { CreateBoardDTO } from './CreateBoardDTO';
import { IBoardsRepository } from '../../repositories/IBoardsRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateBoardUseCase {
  constructor(
    @inject('BoardsRepository')
    private boardsRepository: IBoardsRepository
  ) {}

  async execute(boardData: CreateBoardDTO): Promise<void> {
    const initialsAlreadyInUse = await this.boardsRepository.findByInitials(
      boardData.initials
    );

    if (initialsAlreadyInUse) {
      throw new AppError('Initials already in use', 409);
    }

    const boardAlreadyExists = await this.boardsRepository.findByBoard(
      boardData.board
    );

    if (boardAlreadyExists) {
      throw new AppError('Board already exists', 409);
    }

    await this.boardsRepository.create(boardData);

    return;
  }
}

export { CreateBoardUseCase };
