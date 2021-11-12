import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sessionData = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const authInfo = await createSessionUseCase.execute(sessionData);

    return response.status(201).json(authInfo);
  }
}

export { CreateSessionController };
