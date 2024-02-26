import { Router } from "express";
import { authenticate, requireUser, validateResource } from "../middleware";
import { createAllUserSchema, createUserByIdSchema } from "../schema";
import { getUserByIdHandler, getAllUsersHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.use(authenticate, requireUser);

// Get Users Route
userRoutes.get("/", validateResource(createAllUserSchema), getAllUsersHandler);

// Get Specific User Route
userRoutes.get("/:id", validateResource(createUserByIdSchema), getUserByIdHandler);

export default userRoutes;
