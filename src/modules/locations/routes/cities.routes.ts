import { Router } from 'express';

const citiesRoutes = Router();

citiesRoutes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Welcome' });
});

export default citiesRoutes;
