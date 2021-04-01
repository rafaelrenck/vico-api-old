import { Router } from 'express';

import { boardsRoutes } from './modules/workers/routes/boards.routes';
import { rolesRoutes } from './modules/workers/routes/roles.routes';
import { sessionsRoutes } from './modules/workers/routes/sessions.routes';
import { usersRoutes } from './modules/workers/routes/users.routes';
import { citiesRoutes } from './modules/locations/routes/cities.routes';
import { countriesRoutes } from './modules/locations/routes/countries.routes';
import { statesRoutes } from './modules/locations/routes/states.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/boards', boardsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/users', usersRoutes);

routes.use('/countries', countriesRoutes);
routes.use('/states', statesRoutes);
routes.use('/cities', citiesRoutes);

export { routes };
