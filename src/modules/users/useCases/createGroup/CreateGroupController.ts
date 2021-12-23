import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupUseCase } from './CreateGroupUseCase';

class CreateGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const group = request.body;

    const createGroupUseCase = container.resolve(CreateGroupUseCase);

    await createGroupUseCase.execute(group);

    return response.status(201).send();
  }
}

export { CreateGroupController };
