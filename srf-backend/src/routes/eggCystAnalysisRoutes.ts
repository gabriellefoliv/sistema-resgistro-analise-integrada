import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EggCystAnalysisController } from "../controllers/liveanimals/eggCystAnalysisController";

export const eggCystAnalysisRoutes = Router();

const eggCystAnalysisController = new EggCystAnalysisController();

eggCystAnalysisRoutes.get('/egg-cyst-analysis/get-all', authMiddleware(), eggCystAnalysisController.getAll);
eggCystAnalysisRoutes.get('/egg-cyst-analysis/get-form-options', authMiddleware(), eggCystAnalysisController.getFormOptions);
eggCystAnalysisRoutes.post('/egg-cyst-analysis/create', authMiddleware(), eggCystAnalysisController.create);
eggCystAnalysisRoutes.put('/egg-cyst-analysis/update/:recordId', authMiddleware(), eggCystAnalysisController.update);
eggCystAnalysisRoutes.delete('/egg-cyst-analysis/delete/:recordId', authMiddleware(), eggCystAnalysisController.delete);
