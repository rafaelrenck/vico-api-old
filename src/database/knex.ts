import knex from 'knex';

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.SIGH_DB_HOST,
      port: process.env.SIGH_DB_PORT,
      database: process.env.SIGH_DB_DATABASE,
      user: process.env.SIGH_DB_USERNAME,
      password: process.env.SIGH_DB_PASSWORD,
    },
  },
};

export const knexDB = knex(knexConfig.development);
