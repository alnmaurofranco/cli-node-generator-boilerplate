import '@config/env';
import server from './server';
import { baseUrl, port } from '@config/index';

server.listen(port, () =>
  console.log(`Server started on ${baseUrl}:${port} ✨`)
);
