import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PhysicalExamController } from "../controllers/liveanimals/physicalExamController";

export const physicalExamRoutes = Router();

const physicalExamController = new PhysicalExamController();

physicalExamRoutes.get('/physical-exam/get-all', authMiddleware(), physicalExamController.getAll);
physicalExamRoutes.get('/physical-exam/get-form-options', authMiddleware(), physicalExamController.getFormOptions);
physicalExamRoutes.post('/physical-exam/create', authMiddleware(), physicalExamController.create);
physicalExamRoutes.put('/physical-exam/update/:recordId', authMiddleware(), physicalExamController.update);
physicalExamRoutes.delete('/physical-exam/delete/:recordId', authMiddleware(), physicalExamController.delete);