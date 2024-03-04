import { Router } from "express";
import { authenticate, requireUser, restrictTo, validateResource } from "../middleware";
import { changePasswordSchema, contactUsSchema } from "../schema";
import { 
    getUserByIdHandler, 
    getAllUsersHandler, 
    deleteUserHandler,
    updateUserProfileHandler,
    changeUserPasswordHandler,
    updatedUserPhotoHandler,
    contactUsHandler, 
} from "../controllers/user.controller";

const userRoutes = Router();

// userRoutes.use(authenticate, requireUser);

// Get Specific User Route
userRoutes.get("/:id", getUserByIdHandler);

// Get Users Route
userRoutes.get("/all", restrictTo("admin"), getAllUsersHandler);

// Delete User Route
userRoutes.delete("/:id", deleteUserHandler);

// Update Profile User Route
// userRoutes.put("/:id/profile", updateUserProfileHandler);
userRoutes.put("/profile", updateUserProfileHandler);

// Update profile picture
userRoutes.put("/profile-photo", updatedUserPhotoHandler);

// Change User Password Route
userRoutes.post("/change-password", validateResource(changePasswordSchema), changeUserPasswordHandler);

userRoutes.post("/contact-us", validateResource(contactUsSchema), contactUsHandler);

export default userRoutes;
