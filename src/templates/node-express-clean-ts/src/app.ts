import express from "express";
import cors from "cors";

import { router } from "./routes";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(router);

export { app };
