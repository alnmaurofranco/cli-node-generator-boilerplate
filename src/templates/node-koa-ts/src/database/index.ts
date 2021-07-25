import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import 'colors';

config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

export const connectWithDB = async (): Promise<void> => {
  const connection = await createConnection();

  await connection
    .synchronize(false)
    .then(() => console.log('Synchronized with DB'.green.bold))
    .catch(() => console.error('Failed to sync with DB'.red.bold));
};
