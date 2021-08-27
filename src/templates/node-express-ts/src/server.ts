import '@config/env';
import { baseUrl, PORT } from '@config/index';
import { LoggerService } from 'logger/LoggerService';
// import { log } from 'logger';
import { app } from './app';

const logger = new LoggerService(`app`);

app.listen(PORT, () =>
  logger.info(`Server started go to ${baseUrl}:${PORT} ✨`)
);
