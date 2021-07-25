const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({
  path:
    process.env.NODE_ENV !== 'production'
      ? resolve(__dirname, '.env.development')
      : resolve(__dirname, '.env.production'),
});

module.exports = {
  type: 'postgres' || process.env.TYPEORM_TYPE, // Banco de dados que vai utilizar
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DB,
  synchronize: false,
  logging: false,
  entities: ['src/database/models/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscriber/*.ts'],
  cli: {
    entitiesDir: 'src/database/models',
    migrationsDir: 'src/database/migrations',
  },
};
