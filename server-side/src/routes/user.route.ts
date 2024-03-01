import { Router } from "express";
import { authenticate, requireUser, restrictTo } from "../middleware";
import { 
    getUserByIdHandler, 
    getAllUsersHandler, 
    deleteUserHandler,
    updateUserProfileHandler, 
} from "../controllers/user.controller";

const userRoutes = Router();

// userRoutes.use(authenticate, requireUser);

// Get Users Route
userRoutes.get("/all", restrictTo("admin"), getAllUsersHandler);

// Get Specific User Route
userRoutes.get("/:id", getUserByIdHandler);

// Delete User Route
userRoutes.delete("/:id", deleteUserHandler);

// Update Profile User Route
userRoutes.put("/:id/profile", updateUserProfileHandler);

export default userRoutes;
