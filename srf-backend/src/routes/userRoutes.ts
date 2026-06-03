import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/user/get-all', authMiddleware('admin'), userController.getAll);
userRoutes.get('/user/user-access/:userId', authMiddleware(), userController.getUserAccess);
userRoutes.post('/user/create', authMiddleware('admin'), userController.create);
userRoutes.post('/login', userController.login);
userRoutes.post('/forgot-password', userController.forgotPassword);
userRoutes.delete('/user/delete', authMiddleware('admin'), userController.delete);
userRoutes.put('/user/update/details', authMiddleware(), userController.updateDetails);
userRoutes.put('/user/update/role', authMiddleware('admin'), userController.updateRole);
userRoutes.put('/user/update/access', authMiddleware('admin'), userController.updateUserAccess);
userRoutes.put('/user/update/password', authMiddleware('admin'), userController.updatePassword);

