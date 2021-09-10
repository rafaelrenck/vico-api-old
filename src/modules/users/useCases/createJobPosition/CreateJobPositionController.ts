import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateJobPositionUseCase } from './CreateJobPositionUseCase';

class CreateJobPositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const jobPositionData = request.body;

    const createJobPositionUseCase = container.resolve(
      CreateJobPositionUseCase
    );

    await createJobPositionUseCase.execute(jobPositionData);

    return response.status(201).send();
  }
}

export { CreateJobPositionController };
