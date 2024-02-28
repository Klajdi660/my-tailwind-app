import { Router } from "express";
import { gameListHandler } from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.post("/", gameListHandler);

export default gameRouter;
