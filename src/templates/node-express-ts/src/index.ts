import '@config/env';
import { baseUrl, port } from '@config/index';
import server from './server';

server.listen(port, () =>
  console.log(`Server started go to ${baseUrl}:${port} ✨`)
);
