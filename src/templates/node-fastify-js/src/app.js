import fastify from 'fastify'
import swagger from 'fastify-swagger'
import { routes } from './routes'

import swaggerOptions from './config/swagger'

const app = fastify({
  logger: true,
})

app.get('/', async (req, replay) =>
  replay.send({
    message: 'Welcome Generator Node Boilerplate - Fastify',
  })
)

routes.forEach((route, _index) => {
  app.route(route, {
    prefix: '/api/v1',
  })
})

app.register(swagger, swaggerOptions)

export { app }
