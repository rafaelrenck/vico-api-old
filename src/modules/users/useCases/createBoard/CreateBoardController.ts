import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBoardUseCase } from './CreateBoardUseCase';

class CreateBoardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const boardData = request.body;

    const createBoardUseCase = container.resolve(CreateBoardUseCase);

    await createBoardUseCase.execute(boardData);

    return response.status(201).send();
  }
}

export { CreateBoardController };
