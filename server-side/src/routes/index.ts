import { Router } from "express";
import config from "config";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import gameRouter from "./game.route";
import { AppParams } from "../types";

const { prefix } = config.get<AppParams>("app");

const routes = Router();

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/game`, gameRouter);

export default routes;
