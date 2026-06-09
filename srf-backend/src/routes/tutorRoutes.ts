import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TutorController } from "../controllers/liveanimals/tutorController";

export const tutorRoutes = Router();

const tutorController = new TutorController();

tutorRoutes.get('/tutor/get-all', authMiddleware(), tutorController.getAll);
tutorRoutes.get('/tutor/get-form-options', authMiddleware(), tutorController.getFormOptions);
tutorRoutes.post('/tutor/create', authMiddleware(), tutorController.create);
tutorRoutes.put('/tutor/update/:recordId', authMiddleware(), tutorController.update);
tutorRoutes.delete('/tutor/delete/:recordId', authMiddleware(), tutorController.delete);
