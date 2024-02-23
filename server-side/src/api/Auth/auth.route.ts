import { Router, Request, Response } from "express";
import crypto from "crypto";
import config from "config";
import { asyncHandler } from "../../utils";
import { validateResource, authenticate } from "../../middleware";
import { 
    createLoginSchema, 
    createUserSchema, 
    createOTPCodeSchema, 
    createForgotPasswordSchema,
    createResetPasswordSchema,
} from "../../schema";
import { 
    loginHandler, 
    registerHandler, 
    verifyEmailHandler, 
    logoutHandler, 
    forgotPasswordHandler, 
    resetPasswordHandler 
} from "./auth.controller";
import passport from "passport";
import { AppParams } from "../../types";

const { client_url } = config.get<AppParams>("app");

const authRouter = Router();

authRouter.post(
    "/login",
    validateResource(createLoginSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { usernameOrEmail, password, rememberMe } = req.body;
        console.log('req.body :>> ', req.body);
        const response = await loginHandler(usernameOrEmail, password, rememberMe) as any;
        if (rememberMe) {
            console.log('response :>> ', response);
            const { maxAge, access_token } = response;
            res.cookie('rememberMeToken', access_token, {
                httpOnly: true,
                maxAge,
            });
    
        }

        res.json(response);
    })
);

authRouter.post(
    "/register",
    validateResource(createUserSchema),
    asyncHandler(async (req: Request, res: Response) => {   
        const response = await registerHandler(req.body);
        res.json(response);
    })
);

authRouter.post(
    "/register-confirm",
    validateResource(createOTPCodeSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { code, email } = req.body;
        const response = await verifyEmailHandler(code, email);
        res.json(response);
    })
);

authRouter.get(
    "/logout",
    authenticate,
    asyncHandler(async (req: Request | any, res: Response) => {
        const user = res.locals.user;
        console.log('req.cookie :>> ', req.cookies);
        // const { rememberMe } = req.cookie;
        // console.log('rememberMe :>> ', rememberMe);
        const response = await logoutHandler(user);
        // if (req.cookies.rememberMeToken) {
        //     res.clearCookie('rememberMeToken');
        // }
        res.json(response);
    })
);

authRouter.post(
    "/forgot-password",
    validateResource(createForgotPasswordSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await forgotPasswordHandler(email);
        res.json(response);
    })
);

authRouter.put(
    "/reset-password/:token",
    validateResource(createResetPasswordSchema),
    asyncHandler(async ( req: Request, res: Response) => {
        const { token } = req.params;
        const { password } = req.body;
        const response = await resetPasswordHandler(token, password);
        res.json(response);
    })
);

authRouter.get(
    "/google",
    passport.authenticate(
        "google",
        {
            scope: ["profile", "email"]
        }
    )
);

authRouter.get(
    '/google/callback',
    passport.authenticate(
        'google', 
        { 
            failureRedirect: `${client_url}/login`,
            session: false,
        },
    ),
    asyncHandler(async (req: Request, res: Response) => {
        res.redirect(`${client_url}`);
    })
);

export default authRouter;
