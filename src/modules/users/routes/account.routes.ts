import { Router } from 'express';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { MyProfileController } from '../useCases/myProfile/MyProfileController';
import { SignInController } from '../useCases/signIn/SignInController';

const accountRoutes = Router();

const myProfileController = new MyProfileController();
const signInController = new SignInController();

accountRoutes.post('/sign-in', signInController.handle);
accountRoutes.get('/me', ensureAuthenticated, myProfileController.handle);

export { accountRoutes };
