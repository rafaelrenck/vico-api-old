import { Router } from 'express';
import { Request, Response } from 'express';
import { utcToZonedTime } from 'date-fns-tz';
import { startOfMonth, endOfMonth } from 'date-fns';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { knexDB as knex } from '../../../database/knex';

import uploadConfig from '../../../config/upload';

const sighRoutes = Router();

const uploadDigitalArchive = multer(uploadConfig.upload('archive', 'teste'));

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

sighRoutes.get(
  '/appointments',
  async (request: Request, response: Response) => {
    const types = [];

    const month = utcToZonedTime(
      new Date(request.query.month.toString()),
      '00:00'
    );

    request.query.amb === 'true' && types.push('AMB');
    request.query.ext === 'true' && types.push('EXT');
    request.query.int === 'true' && types.push('INT');

    let results = [];

    if (request.query.invoice === '') {
      results = await knex
        .select(
          'fia.id_fia as id_fia',
          'fia.data_atendimento as date',
          'fia.hora_inicio as hour',
          'fia.tipo_atend as type',
          'pac.registro as id_patient',
          'pac.nm_paciente as patient',
          'pac.data_nasc as date_of_birth'
        )
        .from('sigh.ficha_amb_int as fia')
        .leftJoin(
          'sigh.pacientes as pac',
          'fia.cod_paciente',
          'pac.id_paciente'
        )
        .whereBetween('fia.data_atendimento', [
          startOfMonth(month),
          endOfMonth(month),
        ])
        .where({
          'fia.cod_convenio': request.query.insurance.toString(),
        })
        .whereIn('fia.tipo_atend', types)
        .whereRaw('pac.nm_paciente ilike ?', [
          request.query.patient.toString().concat('%'),
        ])
        .orderBy([
          'fia.tipo_atend',
          'fia.data_atendimento',
          'fia.hora_inicio',
          'pac.nm_paciente',
        ]);
    } else {
      results = await knex
        .select(
          'fia.id_fia as id_fia',
          'fia.data_atendimento as date',
          'fia.hora_inicio as hour',
          'fia.tipo_atend as type',
          'pac.registro as id_patient',
          'pac.nm_paciente as patient',
          'pac.data_nasc as date_of_birth'
        )
        .from('sigh.faturas_contas as rem')
        .leftJoin('sigh.contas as cnt', 'rem.id_fatura', 'cnt.cod_fatura')
        .leftJoin('sigh.ficha_amb_int as fia', 'cnt.cod_fia', 'fia.id_fia')
        .leftJoin(
          'sigh.pacientes as pac',
          'fia.cod_paciente',
          'pac.id_paciente'
        )
        .where({
          'rem.cod_convenio': request.query.insurance.toString(),
          'rem.numero_fatura': request.query.invoice,
        })
        .orderBy(['pac.nm_paciente', 'fia.hora_inicio']);
    }
    const totalCount = results.length.toString();
    const appointments = results.slice(
      (Number(request.query.page) - 1) * 10,
      (Number(request.query.page) - 1) * 10 + 10
    );
    return response.json({ totalCount, appointments });
  }
);

sighRoutes.post(
  '/upload/archive/:id',
  uploadDigitalArchive.single('fia'),
  (request: Request, response: Response) => {
    return response.status(200).send();
  }
);

sighRoutes.get('/archive/:id', (request: Request, response: Response) => {
  return response.json({
    fileExists: fs.existsSync(
      path.join(
        path.resolve(__dirname, '..', '..', '..', '..', 'archive'),
        request.params.id + '_SCAN.PDF'
      )
    ),
  });
});

export { sighRoutes };
