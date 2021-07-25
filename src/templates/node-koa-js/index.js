const koa = require('koa');

const server = koa();

server.use(function* (next) {
  console.time('ms');
  const { ms } = console.timeEnd('ms');
  console.log('ms %s', ms);
});

server.use(function* (next) {
  this.body = 'Welcome to NodeJS Generator Boilerplate';
});

const port = process.env.PORT || 3333;

server.listen(port);
