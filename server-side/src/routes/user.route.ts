import { Router } from "express";
import {
  authenticate,
  requireUser,
  restrictTo,
  validateResource,
} from "../middleware";
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
userRoutes.use(authenticate);

userRoutes.get("/:id", getUserByIdHandler);

userRoutes.get("/all", restrictTo("admin"), getAllUsersHandler);

userRoutes.delete("/:id", deleteUserHandler);

// userRoutes.put("/:id/profile", updateUserProfileHandler);
userRoutes.put("/profile", updateUserProfileHandler);

userRoutes.put("/profile-photo", updatedUserPhotoHandler);

userRoutes.post(
  "/change-password",
  validateResource(changePasswordSchema),
  changeUserPasswordHandler
);

userRoutes.post(
  "/contact-us",
  validateResource(contactUsSchema),
  contactUsHandler
);

export default userRoutes;
