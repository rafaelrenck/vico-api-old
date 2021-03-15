import { Router } from 'express';

import UFsController from '../controllers/UFsController';

const ufsRoutes = Router();
const ufsController = new UFsController();

ufsRoutes.get('/', ufsController.list);

ufsRoutes.post('/', ufsController.create);

ufsRoutes.put('/', ufsController.update);

ufsRoutes.delete('/', ufsController.delete);

export default ufsRoutes;
