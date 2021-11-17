import { Router } from 'express';
import { Request, Response } from 'express';
import { parseISO, startOfMonth, endOfMonth } from 'date-fns';

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

sighRoutes.get('/appointments', (request: Request, response: Response) => {
  const types = [];

  request.query.amb === 'true' && types.push('AMB');
  request.query.ext === 'true' && types.push('EXT');
  request.query.int === 'true' && types.push('INT');

  knex
    .select(
      'fia.id_fia as id',
      'fia.data_atendimento as date',
      'fia.hora_inicio as hour',
      'fia.tipo_atend as type',
      'pac.nm_paciente as patient'
    )
    .from('sigh.ficha_amb_int as fia')
    .leftJoin('sigh.pacientes as pac', 'fia.cod_paciente', 'pac.id_paciente')
    .whereBetween('fia.data_atendimento', [
      startOfMonth(parseISO(request.query.month.toString())),
      endOfMonth(parseISO(request.query.month.toString())),
    ])
    .where('fia.cod_convenio', request.query.insurance.toString())
    .whereIn('fia.tipo_atend', types)
    .orderBy([
      'fia.tipo_atend',
      'fia.data_atendimento',
      'pac.nm_paciente',
      'fia.hora_inicio',
    ])
    .then((results) => {
      return response.json(results);
    });
});

export { sighRoutes };
