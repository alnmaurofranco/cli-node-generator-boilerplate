const { Router } = require('express');

const routes = Router();

routes.get('/', (_req, res) =>
  res.json({ message: 'Welcome to Generator NodeJS' })
);

module.exports = routes;
