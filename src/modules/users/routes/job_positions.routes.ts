import { Router } from 'express';
import { CreateRoleController } from '../useCases/createRole/CreateRoleController';

const jobPositionsRoutes = Router();

const createRoleController = new CreateRoleController();

jobPositionsRoutes.post('/', createRoleController.handle);

export { jobPositionsRoutes };
