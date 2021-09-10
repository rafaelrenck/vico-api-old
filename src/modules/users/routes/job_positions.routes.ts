import { Router } from 'express';
import { CreateJobPositionController } from '../useCases/createJobPosition/CreateJobPositionController';

const jobPositionsRoutes = Router();

const createJobPositionController = new CreateJobPositionController();

jobPositionsRoutes.post('/', createJobPositionController.handle);

export { jobPositionsRoutes };
