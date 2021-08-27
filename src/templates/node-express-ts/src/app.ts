import 'express-async-errors';

import express from 'express';
import path from 'path';
import helmet from 'helmet';
import volleyball from 'volleyball';
import cors from 'cors';

import { HandleMiddlewareError, HandleErrorNotFound } from '@errors/index';
import { router } from './routes';

const app: express.Application = express();

// Config Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Template
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(volleyball);
app.use(
  cors({
    origin: '*',
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Routes
app.get('/', (_req, res) => res.redirect('/api'));
app.use('/api', router);

// Errors
app.use(HandleMiddlewareError);
app.use(HandleErrorNotFound);

export { app };
