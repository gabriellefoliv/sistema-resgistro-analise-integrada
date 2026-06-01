import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ExamResultController } from "../controllers/liveanimals/examResultController";

export const examResultRoutes = Router();

const examResultController = new ExamResultController();

examResultRoutes.get('/exam-result/get-all', authMiddleware(), examResultController.getAll);
examResultRoutes.get('/exam-result/get-form-options', authMiddleware(), examResultController.getFormOptions);
examResultRoutes.post('/exam-result/create', authMiddleware(), examResultController.create);
examResultRoutes.put('/exam-result/update/:recordId', authMiddleware(), examResultController.update);
examResultRoutes.delete('/exam-result/delete/:recordId', authMiddleware(), examResultController.delete);
