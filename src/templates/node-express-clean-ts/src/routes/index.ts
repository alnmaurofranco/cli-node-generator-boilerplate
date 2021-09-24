import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  return response.send(
    "Welcome to API CLEAN with Node.js + Express.js + TypeScript"
  );
});

export { router };
