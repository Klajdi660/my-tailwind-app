import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils";
import { authenticate, requireUser, validateResource } from "../../middleware";
import { createAllUserSchema, createUserByIdSchema } from "../../schema";
import { userHandler, oneUserHandler } from "./user.controller";

const userRoutes = Router();

userRoutes.use(authenticate, requireUser);

userRoutes.get(
    "/user",
    validateResource(createAllUserSchema),
    asyncHandler(async (req: Request, res: Response) => { 
        const { page = 1, pageSize = 10 } = req.query;  
        const response = await userHandler(+page, +pageSize);
        res.json(response);
    })
);

userRoutes.get(
    "/user/:id",
    validateResource(createUserByIdSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await oneUserHandler(id);
        res.json(response);
    })
);

export default userRoutes;
