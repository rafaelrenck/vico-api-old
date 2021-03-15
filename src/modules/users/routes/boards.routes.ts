import { Router } from 'express';

const boardsRoutes = Router();

boardsRoutes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Welcome' });
});

export default boardsRoutes;
