import { Router, Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { validateResource } from "../../middleware";
import { createLoginSchema, createRegisterSchema, createOTPCodeSchema, createResetPassTokenSchema } from "../../schema";
import { loginHandler, registerHandler, confirmRegisterHandler, logoutHandler, resetPasswordTokenHandler } from "./auth.controller";
import { accessTokenCookieOptions, refreshTokenCookieOptions, loginTokenCookieOptions } from "../../utils";

const authRouter = Router();

// Login user route
authRouter.post(
    "/login",
    validateResource(createLoginSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { usernameOrEmail, password } = req.body;
        const response = await loginHandler(usernameOrEmail, password);
        const { lToken, rToken } = response;
        res
            // .cookie("access_token", lToken, accessTokenCookieOptions)
            // .cookie("refresh_token", rToken, refreshTokenCookieOptions)
            // .cookie("logged_in", true, loginTokenCookieOptions)
            .json(response);
    })
);

// Register user route 
authRouter.post(
    "/register",
    validateResource(createRegisterSchema),
    asyncHandler(async (req: Request, res: Response) => {   
        const response = await registerHandler(req.body);
        res.json(response);
    })
);

// Route for sending OTP code to the user's email
authRouter.post(
    "/confirm",
    validateResource(createOTPCodeSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { code, email } = req.body;
        const response = await confirmRegisterHandler(code, email);
        res.json(response);
    })
);

authRouter.get(
    "/logout",
    asyncHandler(async (req: Request, res: Response) => {
        const user = res.locals.user;
        console.log('user :>> ', user);
        console.log('res.locals :>> ', res.locals);
        const response = await logoutHandler(user);

        res
            // .cookie("access_token", "", { maxAge: 1 })
            // .cookie("refresh_token", "", { maxAge: 1 })
            // .cookie("logged_in", "", { maxAge: 1 })
            .json(response);
    })
);

// Route for generating a reset password token
authRouter.post(
    "/reset-password-token",
    validateResource(createResetPassTokenSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await resetPasswordTokenHandler(email);
        res.json(response);
    })
);

export default authRouter;
