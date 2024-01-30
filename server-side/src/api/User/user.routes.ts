import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils";
import { authenticate, validateResource } from "../../middleware";
import { createAllUserSchema, createUserByIdSchema } from "../../schema";
import { userHandler, oneUserHandler } from "./user.controller";

const userRoutes = Router();

userRoutes.get(
    "/user",
    validateResource(createAllUserSchema),
    authenticate,
    asyncHandler(async (req: Request, res: Response) => { 
        const { page = 1, pageSize = 10 } = req.query;  
        const response = await userHandler(+page, +pageSize);
        res.json(response);
    })
);

userRoutes.get(
    "/user/:id",
    validateResource(createUserByIdSchema),
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log('id :>> ', typeof id);
        const response = await oneUserHandler(id);
        res.json(response);
    })
);

export default userRoutes;
