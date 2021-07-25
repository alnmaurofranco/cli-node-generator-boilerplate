import 'reflect-metadata';
import Koa, { DefaultState, DefaultContext, ParameterizedContext } from 'koa';

import Router from 'koa-router';
import 'colors';
import { createKoaServer } from 'routing-controllers';
import { connectWithDB } from './database';
import UserController from './controllers/UserController';

(async () => {
  const port = process.env.PORT || 3333;
  const app: Koa<DefaultState, DefaultContext> = createKoaServer({
    controllers: [UserController],
    routePrefix: '/api',
  });
  const router: Router = new Router();

  await connectWithDB();

  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });

  router.get(
    '/',
    async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
      await next();
      ctx.body = { msg: 'Welcome GNB - Template => Koa with Typescript' };
    }
  );

  router.get(
    '',
    async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
    }
  );

  app.use(router.routes()).use(router.allowedMethods());

  app
    .listen(port)
    .on('listening', () =>
      console.log(
        `Server started on port=${port} go to http://localhost:${port}`.blue
          .bold
      )
    );
})();
