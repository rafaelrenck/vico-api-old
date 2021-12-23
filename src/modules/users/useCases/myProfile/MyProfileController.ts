import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MyProfileUseCase } from './MyProfileUseCase';

class MyProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = response.locals.user_id;

    const myProfileUseCase = container.resolve(MyProfileUseCase);

    const user = await myProfileUseCase.execute(id);

    return response.status(201).json(user);
  }
}

export { MyProfileController };
