import { Router } from 'express';

import { accountRoutes } from './modules/users/routes/account.routes';
import { statesRoutes } from './modules/locations/routes/states.routes';
import { boardsRoutes } from './modules/users/routes/boards.routes';
import { jobPositionsRoutes } from './modules/users/routes/job_positions.routes';
import { usersRoutes } from './modules/users/routes/users.routes';

import { sighRoutes } from './modules/sigh/routes/sigh.routes';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const routes = Router();

routes.use(accountRoutes);
routes.use('/states', ensureAuthenticated, statesRoutes);
routes.use('/boards', ensureAuthenticated, boardsRoutes);
routes.use('/job_positions', ensureAuthenticated, jobPositionsRoutes);
routes.use('/users', ensureAuthenticated, usersRoutes);

routes.use('/sigh', ensureAuthenticated, sighRoutes);

export { routes };
