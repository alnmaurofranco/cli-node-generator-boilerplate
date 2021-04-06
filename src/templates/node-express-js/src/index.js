require('../config/env');
const server = require('./server');
const { port, baseUrl } = require('../config');

server.listen(port, () =>
  console.log(`Server started on ${baseUrl}:${port} ✨`)
);
