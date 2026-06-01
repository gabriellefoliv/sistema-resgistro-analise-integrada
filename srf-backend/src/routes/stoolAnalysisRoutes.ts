import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { StoolAnalysisController } from "../controllers/liveanimals/stoolAnalysisController";

export const stoolAnalysisRoutes = Router();

const stoolAnalysisController = new StoolAnalysisController();

stoolAnalysisRoutes.get('/stool-analysis/get-all', authMiddleware(), stoolAnalysisController.getAll);
stoolAnalysisRoutes.get('/stool-analysis/get-form-options', authMiddleware(), stoolAnalysisController.getFormOptions);
stoolAnalysisRoutes.post('/stool-analysis/create', authMiddleware(), stoolAnalysisController.create);
stoolAnalysisRoutes.put('/stool-analysis/update/:recordId', authMiddleware(), stoolAnalysisController.update);
stoolAnalysisRoutes.delete('/stool-analysis/delete/:recordId', authMiddleware(), stoolAnalysisController.delete);
