import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NecropsyExamResultController } from "../controllers/deadanimals/necropsyExamResultController";

export const necropsyExamResultRoutes = Router();

const controller = new NecropsyExamResultController();

// Geral
necropsyExamResultRoutes.get('/necropsy-exam-result/get-all', authMiddleware(), controller.getAll);

// CPCR
necropsyExamResultRoutes.get('/necropsy-exam-result/cpcr/get-form-options', authMiddleware(), controller.getCPCRFormOptions);
necropsyExamResultRoutes.post('/necropsy-exam-result/cpcr/create', authMiddleware(), controller.createCPCR);
necropsyExamResultRoutes.put('/necropsy-exam-result/cpcr/update/:recordId', authMiddleware(), controller.updateCPCR);
necropsyExamResultRoutes.delete('/necropsy-exam-result/cpcr/delete/:recordId', authMiddleware(), controller.deleteCPCR);

// QPCR
necropsyExamResultRoutes.get('/necropsy-exam-result/qpcr/get-form-options', authMiddleware(), controller.getQPCRFormOptions);
necropsyExamResultRoutes.post('/necropsy-exam-result/qpcr/create', authMiddleware(), controller.createQPCR);
necropsyExamResultRoutes.put('/necropsy-exam-result/qpcr/update/:recordId', authMiddleware(), controller.updateQPCR);
necropsyExamResultRoutes.delete('/necropsy-exam-result/qpcr/delete/:recordId', authMiddleware(), controller.deleteQPCR);
