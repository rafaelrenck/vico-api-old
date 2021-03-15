import { Router } from 'express';

import boardsRoutes from './modules/users/routes/boards.routes';
import rolesRoutes from './modules/users/routes/roles.routes';
import sessionsRoutes from './modules/users/routes/sessions.routes';
import usersRoutes from './modules/users/routes/users.routes';
import citiesRoutes from './modules/locations/routes/cities.routes';
import countriesRoutes from './modules/locations/routes/countries.routes';
import ufsRoutes from './modules/locations/routes/ufs.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/boards', boardsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/users', usersRoutes);

routes.use('/countries', countriesRoutes);
routes.use('/ufs', ufsRoutes);
routes.use('/cities', citiesRoutes);

export default routes;
