import { Router } from "express";
import config from "config";
import { validateResource, authenticate, requireUser } from "../middleware";
import {
  loginUserSchema,
  createUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schema";
import {
  loginHandler,
  registerHandler,
  verifyEmailHandler,
  logoutHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  refreshAccessTokenHandler,
  googleOauthHandler,
} from "../controllers/auth.controller";
import passport from "passport";
import { AppParams } from "../types";

const { client_url } = config.get<AppParams>("app");

const authRouter = Router();

authRouter.post(
  "/register",
  validateResource(createUserSchema),
  registerHandler
);

authRouter.post(
  "/verify-email",
  validateResource(verifyEmailSchema),
  verifyEmailHandler
);

authRouter.post("/login", validateResource(loginUserSchema), loginHandler);

authRouter.get("/logout", /*authenticate, requireUser,*/ logoutHandler);

authRouter.get("/refresh", refreshAccessTokenHandler);

authRouter.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

authRouter.post(
  "/reset-password",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${client_url}/login`,
    session: false,
  }),
  googleOauthHandler
);

export default authRouter;
