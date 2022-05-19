import express, { Application } from "express";

const PORT = process.env.PORT || 3333;

function bootstrap() {
  const app: Application = express();

  app.get("/", (req, res) => {
    res.status(200).send("Welcome API");
  });

  app.listen(PORT, () =>
    console.log(`HTTP running on port http://localhost:${PORT}`)
  );
}

bootstrap();
