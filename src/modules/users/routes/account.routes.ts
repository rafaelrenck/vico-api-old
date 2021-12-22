import { Router } from 'express';
import { SignInController } from '../useCases/signIn/SignInController';

const accountRoutes = Router();

const signInController = new SignInController();

accountRoutes.post('/sign-in', signInController.handle);

export { accountRoutes };
