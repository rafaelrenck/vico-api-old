import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStateUseCase } from './CreateStateUseCase';

class CreateStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const stateData = request.body;

    const createStateUseCase = container.resolve(CreateStateUseCase);

    await createStateUseCase.execute(stateData);

    return response.status(201).send();
  }
}

export { CreateStateController };
