import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SignInUseCase } from './SignInUseCase';

class SignInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const signInUseCase = container.resolve(SignInUseCase);

    const token = await signInUseCase.execute({ username, password });

    return response.status(201).json(token);
  }
}

export { SignInController };
