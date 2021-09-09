import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const roleData = request.body;

    const createRoleUseCase = container.resolve(CreateRoleUseCase);

    await createRoleUseCase.execute(roleData);

    return response.status(201).send();
  }
}

export { CreateRoleController };
