import { Router } from 'express';
import { CreateGroupController } from '../useCases/createGroup/CreateGroupController';

const groupsRoutes = Router();

const createGroupController = new CreateGroupController();

groupsRoutes.post('/', createGroupController.handle);

export { groupsRoutes };
