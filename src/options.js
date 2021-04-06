const options = [
  {
    template: "node-express-js",
    description: "Server with ExpressJS + Javascript",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan ejs",
    devDependencies: "eslint nodemon prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1",
  },
  {
    template: "node-express-ts",
    description: "Server with ExpressJS + Typescript",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan ejs",
    devDependencies:
      "@types/express @types/cookie-parser @types/helmet @types/morgan @types/node @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1  eslint nodemon ts-node-dev tsconfig-paths typescript",
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
