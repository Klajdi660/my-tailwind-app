import { Router, Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { validateResource, authenticate } from "../../middleware";
import { 
    createLoginSchema, 
    createRegisterSchema, 
    createOTPCodeSchema, 
    createForgotPasswordSchema,
    createResetPasswordSchema,
} from "../../schema";
import { 
    loginHandler, 
    registerHandler, 
    confirmRegisterHandler, 
    logoutHandler, 
    forgotPasswordHandler, 
    resetPasswordHandler 
} from "./auth.controller";

const authRouter = Router();

authRouter.post(
    "/login",
    validateResource(createLoginSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { usernameOrEmail, password } = req.body;
        const response = await loginHandler(usernameOrEmail, password);
        res.json(response);
    })
);

authRouter.post(
    "/register",
    validateResource(createRegisterSchema),
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
        const response = await confirmRegisterHandler(code, email);
        res.json(response);
    })
);

authRouter.get(
    "/logout",
    authenticate,
    asyncHandler(async (req: Request | any, res: Response) => {
        const user = res.locals.user;
        const response = await logoutHandler(user);
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
    "/reset-password/:id",
    validateResource(createResetPasswordSchema),
    asyncHandler(async ( req: Request, res: Response) => {
        const { id } = req.params;
        const { h, exp } = req.query as any;
        const { password } = req.body;
        const response = await resetPasswordHandler(id, h, exp, password);
        res.json(response);
    })
);

export default authRouter;
