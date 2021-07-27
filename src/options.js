const options = [
  {
    template: 'node-express-js',
    description: 'Server with ExpressJS + JavaScript + ESLint + Prettier',
    dependencies:
      'cookie-parser dotenv express express-async-errors helmet morgan ejs',
    devDependencies:
      'eslint nodemon prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1',
  },
  {
    template: 'node-express-ts',
    description:
      'Server with ExpressJS + TypeScript + ESLint + Prettier + Jest and Husky with Lint-Staged',
    dependencies:
      'cookie-parser dotenv express express-async-errors helmet morgan ejs cors',
    devDependencies:
      'lint-staged husky prettier eslint-plugin-prettier eslint-config-prettier @types/express @types/cookie-parser @types/helmet @types/morgan @types/node @types/cors @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1 eslint ts-node-dev tsconfig-paths typescript jest ts-jest @types/jest @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver',
  },
  {
    template: 'node-koa-js',
    description: 'Server with KoaJS + JavaScript',
    dependencies: 'koa',
    devDependencies: 'nodemon',
  },
  {
    template: 'node-koa-ts',
    description: 'Server with KoaJS + TypeScript',
    dependencies:
      'koa koa-router colors reflect-metadata typeorm pg class-transformer class-validator bcryptjs routing-controllers concurrently rimraf dotenv',
    devDependencies:
      '@types/node @types/colors @types/koa @types/koa-router typescript ts-node-dev @types/bcryptjs @types/dotenv',
  },
  {
    template: 'node-fastify-js',
    description: 'Server with Fastify API + JavaScript',
    dependencies: 'fastify fastify-swagger mongoose boom dotenv',
    devDependencies:
      'eslint nodemon prettier eslint-plugin-import eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base @babel/core @babel/node @babel/preset-env',
  },
];

module.exports = options;
