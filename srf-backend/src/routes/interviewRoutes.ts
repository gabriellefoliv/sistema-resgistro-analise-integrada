import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { InterviewController } from "../controllers/liveanimals/interviewController";

export const interviewRoutes = Router();

const interviewController = new InterviewController();

interviewRoutes.get('/interview/get-all', authMiddleware(), interviewController.getAll);
interviewRoutes.get('/interview/get-form-options', authMiddleware(), interviewController.getFormOptions);
interviewRoutes.post('/interview/create', authMiddleware(), interviewController.create);
interviewRoutes.put('/interview/update/:recordId', authMiddleware(), interviewController.update);
interviewRoutes.delete('/interview/delete/:recordId', authMiddleware(), interviewController.delete);
