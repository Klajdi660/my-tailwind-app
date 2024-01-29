import { Router } from "express";
import config from "config";
import { userRoutes } from "./api/User";
import { authRoutes } from "./api/Auth";
import { AppParams } from "./types";

const { prefix } = config.get<AppParams>("app");

const routes = Router();

routes.use(`${prefix}/auth`, authRoutes)
routes.use(`${prefix}`, userRoutes);

export default routes;
