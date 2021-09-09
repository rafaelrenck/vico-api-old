import { Router } from 'express';
import { CreateBoardController } from '../useCases/createBoard/CreateBoardController';

const boardsRoutes = Router();

const createStateController = new CreateBoardController();

boardsRoutes.post('/', createStateController.handle);

export { boardsRoutes };
