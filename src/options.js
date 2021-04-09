const options = [
  {
    template: "node-express-js",
    description: "Server with ExpressJS + Javascript + ESLint",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan ejs",
    devDependencies: "eslint nodemon prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1",
  },
  {
    template: "node-express-ts",
    description: "Server with ExpressJS + Typescript + ESLint",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan ejs cors",
    devDependencies:
      "@types/express @types/cookie-parser @types/helmet @types/morgan @types/node @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1  eslint nodemon ts-node-dev tsconfig-paths typescript jest ts-jest @types/jest @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver",
  },
  {
    template: "node-koa-js",
    description: "Server with KoaJS + Javascript",
    dependencies: "koa",
    devDependencies: "nodemon",
  },
  {
    template: "node-koa-ts",
    description: "Server with KoaJS + Typescript",
    dependencies: "",
    devDependencies: "",
  },
];

module.exports = options
