import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { HelminthAnalysisController } from "../controllers/deadanimals/helminthAnalysisController";

export const helminthAnalysisRoutes = Router();
const helminthAnalysisController = new HelminthAnalysisController();

helminthAnalysisRoutes.get('/helminth-analysis/get-all', authMiddleware(), helminthAnalysisController.getAll);
helminthAnalysisRoutes.get('/helminth-analysis/get-form-options', authMiddleware(), helminthAnalysisController.getFormOptions);
helminthAnalysisRoutes.post('/helminth-analysis/create', authMiddleware(), helminthAnalysisController.create);
helminthAnalysisRoutes.put('/helminth-analysis/update/:recordId', authMiddleware(), helminthAnalysisController.update);
helminthAnalysisRoutes.delete('/helminth-analysis/delete/:recordId', authMiddleware(), helminthAnalysisController.delete);