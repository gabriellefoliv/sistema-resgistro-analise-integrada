import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EctoparasiteAnalysisController } from "../controllers/liveanimals/ectoparasiteAnalysisController";

export const ectoparasiteAnalysisRoutes = Router();

const ectoparasiteAnalysisController = new EctoparasiteAnalysisController();

ectoparasiteAnalysisRoutes.get('/ectoparasite-analysis/get-all', authMiddleware(), ectoparasiteAnalysisController.getAll);
ectoparasiteAnalysisRoutes.get('/ectoparasite-analysis/get-form-options', authMiddleware(), ectoparasiteAnalysisController.getFormOptions);
ectoparasiteAnalysisRoutes.post('/ectoparasite-analysis/create', authMiddleware(), ectoparasiteAnalysisController.create);
ectoparasiteAnalysisRoutes.put('/ectoparasite-analysis/update/:recordId', authMiddleware(), ectoparasiteAnalysisController.update);
ectoparasiteAnalysisRoutes.delete('/ectoparasite-analysis/delete/:recordId', authMiddleware(), ectoparasiteAnalysisController.delete);
