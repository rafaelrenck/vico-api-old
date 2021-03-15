import { Router } from 'express';

const sessionsRoutes = Router();

sessionsRoutes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Welcome' });
});

export default sessionsRoutes;
