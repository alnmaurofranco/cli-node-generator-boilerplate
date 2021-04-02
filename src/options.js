const options = [
  {
    template: "node-express-js",
    description: "Server with ExpressJS + Javascript",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan",
    devDependencies: "eslint nodemon",
  },
  {
    template: "node-express-ts",
    description: "Server with ExpressJS + Typescript",
    dependencies:
      "cookie-parser dotenv express express-async-errors helmet morgan",
    devDependencies:
      "@types/express @types/cookie-parser @types/helmet @types/morgan @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint nodemon ts-node-dev tsconfig-paths typescript",
  },
  {
    template: "node-koa-js",
    description: "Server with KoaJS + Javascript",
    dependencies: "",
    devDependencies: "",
  },
  {
    template: "node-koa-ts",
    description: "Server with KoaJS + Typescript",
    dependencies: "",
    devDependencies: "",
  },
];

module.exports = options
