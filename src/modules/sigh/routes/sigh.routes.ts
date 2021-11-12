import { Router } from 'express';
import { Request, Response } from 'express';

import { knexDB as knex } from '../../../database/knex';

const sighRoutes = Router();

sighRoutes.get('/health_insurances', (request: Request, response: Response) => {
  knex
    .select('id_convenio as id', 'nm_convenio as name')
    .from('sigh.convenios')
    .where({
      ativo: true,
    })
    .orderBy('nm_convenio')
    .then((results) => {
      return response.json(results);
    });
});

export { sighRoutes };
