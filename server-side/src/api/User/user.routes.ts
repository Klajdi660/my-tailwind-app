import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils";
import { validateResource } from "../../middleware";
import { createUserSchema } from "../../schema";
import { userHandler } from "./user.controller";

const userRoutes = Router();

// Route for register user 
userRoutes.get(
    "/user",
    validateResource(createUserSchema),
    asyncHandler(async (req: Request, res: Response) => { 
        const { page = 1, pageSize = 10 } = req.query;  
        const response = await userHandler(+page, +pageSize);
        res.json(response);
    })
);

export default userRoutes;