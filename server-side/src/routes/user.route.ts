import { Router } from "express";
import { authenticate, requireUser } from "../middleware";
import { getUserByIdHandler, getAllUsersHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.use(authenticate, requireUser);

// Get Users Route
userRoutes.get("/", getAllUsersHandler);

// Get Specific User Route
userRoutes.get("/:id", getUserByIdHandler);

export default userRoutes;
