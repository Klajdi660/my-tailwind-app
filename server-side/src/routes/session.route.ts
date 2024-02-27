import { Router } from "express";
import config from "config";
import passport from "passport";
import { googleOauthHandler } from "../controllers/auth.controller";
import { AppParams } from "../types";

const { client_url } = config.get<AppParams>("app");

const sessionRoutes = Router();

sessionRoutes.get(
    "/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

sessionRoutes.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${client_url}/login`,
        session: false,
    }),
    googleOauthHandler
);

// sessionRoutes.get('/github', githubOauthHandler);

export default sessionRoutes;