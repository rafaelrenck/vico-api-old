import { Router } from 'express';

import { statesRoutes } from './modules/locations/routes/states.routes';
import { boardsRoutes } from './modules/users/routes/boards.routes';
import { jobPositionsRoutes } from './modules/users/routes/job_positions.routes';
import { usersRoutes } from './modules/users/routes/users.routes';

import { sighRoutes } from './modules/sigh/routes/sigh.routes';

const routes = Router();

routes.use('/states', statesRoutes);
routes.use('/boards', boardsRoutes);
routes.use('/job_positions', jobPositionsRoutes);
routes.use('/users', usersRoutes);

routes.use('/sigh', sighRoutes);

export { routes };
