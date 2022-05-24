const options = [
  {
    template: 'node-express-clean-js',
    description: 'API CLEAN with Node.js + Express.js + JavaScript',
    dependencies: 'express cors',
    devDependencies: 'nodemon',
  },
  {
    template: 'node-express-clean-ts',
    description: 'API CLEAN with Node.js + Express.js + TypeScript',
    dependencies: 'express cors',
    devDependencies:
      'typescript ts-node-dev @types/cors @types/node @types/express ',
  },
  {
    template: 'node-express-js',
    description: 'API with ExpressJS + JavaScript + ESLint + Prettier',
    dependencies:
      'cookie-parser dotenv express express-async-errors helmet morgan ejs',
    devDependencies:
      'eslint nodemon prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1',
  },
  {
    template: 'node-express-ts',
    description:
      'API with ExpressJS + TypeScript + ESLint + Prettier + Jest and Husky with Lint-Staged',
    dependencies:
      'express express-async-errors dotenv helmet morgan ejs cors pino dayjs pino-pretty winston volleyball',
    devDependencies:
      'lint-staged husky prettier eslint-plugin-prettier eslint-config-prettier @types/express @types/cookie-parser @types/helmet @types/morgan @types/node @types/cors @typescript-eslint/eslint-plugin@latest @types/pino @babel/plugin-proposal-class-properties @typescript-eslint/parser@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1 eslint ts-node-dev tsconfig-paths typescript jest ts-jest @types/jest @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver',
  },
  {
    template: 'node-koa-js',
    description: 'API with KoaJS + JavaScript',
    dependencies: 'koa',
    devDependencies: 'nodemon',
  },
  {
    template: 'node-koa-ts',
    description: 'API with KoaJS + TypeScript',
    dependencies:
      'koa koa-router colors reflect-metadata typeorm pg class-transformer class-validator bcryptjs routing-controllers concurrently rimraf dotenv',
    devDependencies:
      '@types/node @types/colors @types/koa @types/koa-router typescript ts-node-dev @types/bcryptjs @types/dotenv',
  },
  {
    template: 'node-fastify-js',
    description: 'API with Fastify API + JavaScript',
    dependencies: 'fastify fastify-swagger mongoose boom dotenv',
    devDependencies:
      'eslint nodemon prettier eslint-plugin-import eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base @babel/core @babel/node @babel/preset-env',
  },
  {
    template: 'node-express-ts-swc',
    description: 'API with Express + TypeScript + SWC',
    dependencies: 'express',
    devDependencies:
      'nodemon typescript @types/express @types/node @swc/cli @swc/core',
  },
  {
    template: 'node-typescript-swc',
    description: 'API TypeScript + SWC',
    dependencies: '',
    devDependencies:
      'typescript ts-node ts-node-dev jest @types/jest @swc/cli @swc/core @types/node @swc/jest',
  },
];

module.exports = options;
