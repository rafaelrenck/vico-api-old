import { Router } from 'express';

const countriesRoutes = Router();

countriesRoutes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Welcome' });
});

export default countriesRoutes;
