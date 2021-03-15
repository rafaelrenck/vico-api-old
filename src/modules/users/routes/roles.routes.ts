import { Router } from 'express';

const rolesRoutes = Router();

rolesRoutes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Welcome' });
});

export default rolesRoutes;
