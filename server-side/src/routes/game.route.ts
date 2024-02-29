import { Router } from "express";
import { gameListHandler } from "../controllers/game.controller";

const gameRouter = Router();

// gameRouter.get("/:type", gameListHandler);
gameRouter.post("/", gameListHandler);

export default gameRouter;
