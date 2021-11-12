import { Router } from 'express';
import { CreateSessionController } from '../useCases/createSession/CreateSessionController';

const sessionRoutes = Router();

const createSessionController = new CreateSessionController();

sessionRoutes.post('/session', createSessionController.handle);

export { sessionRoutes };
