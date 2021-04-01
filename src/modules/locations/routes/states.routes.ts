import { Router } from 'express';
import { CreateStateController } from '../useCases/createState/CreateStateController';

const statesRoutes = Router();

const createStateController = new CreateStateController();

statesRoutes.post('/', createStateController.handle);

export { statesRoutes };
