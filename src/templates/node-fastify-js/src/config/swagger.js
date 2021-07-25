export default {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'GNB CLI - Template Fastify API',
      description: 'REST API with Node.js, MongoDB, Fastify and Swagger',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: `http://localhost:${process.env.PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
}
