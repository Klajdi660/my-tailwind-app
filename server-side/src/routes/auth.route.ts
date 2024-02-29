import { Router, Request, Response } from "express";
import config from "config";
import { asyncHandler } from "../utils";
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
    refreshAccessTokenHandler 
} from "../controllers/auth.controller";
import passport from "passport";
import { AppParams } from "../types";

const { client_url } = config.get<AppParams>("app");

const authRouter = Router();

// Register User Route
authRouter.post("/register", validateResource(createUserSchema), registerHandler);

// Verify Email Route
authRouter.post("/verify-email", validateResource(verifyEmailSchema), verifyEmailHandler);

// Login User Route
authRouter.post("/login", validateResource(loginUserSchema), loginHandler);

// Logout User Route
authRouter.get("/logout", authenticate, requireUser, logoutHandler);

// Refresh Access Token Route
authRouter.get("/refresh", refreshAccessTokenHandler);

// Forgot Password Route
authRouter.post("/forgot-password", validateResource(forgotPasswordSchema), forgotPasswordHandler);

// Reset Password Route
authRouter.post("/reset-password", validateResource(resetPasswordSchema), resetPasswordHandler);

authRouter.get(
    "/google",
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"],
        accessType: "offline",
    })
);

authRouter.get(
    '/google/callback',
    passport.authenticate("google", { 
        failureRedirect: `${client_url}/login`,
        session: false,
    }),
    asyncHandler(async (req: Request, res: Response) => {
        res.redirect(`${client_url}`);
    })
);

export default authRouter;
