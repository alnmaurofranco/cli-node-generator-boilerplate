const express = require('express');
require('express-async-errors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const notFound = require('./errors/notFound');
const handleError = require('./errors/handleError');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.disable('x-powered-by');

// Template
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'production') {
  server.use(morgan('tiny'));
  server.use(helmet());
} else {
  server.use(morgan('dev'));
}

// Rotas
server.get('/', (_req, res) => {
  res.render('index', { name: process.env.NODE_APP });
});
server.use('/api', routes);

server.use(notFound);
server.use(handleError);

module.exports = server;
