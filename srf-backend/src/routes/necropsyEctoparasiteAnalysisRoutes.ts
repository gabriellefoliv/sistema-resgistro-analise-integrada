import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NecropsyEctoparasiteAnalysisController } from "../controllers/deadanimals/necropsyEctoparasiteAnalysisController";

export const necropsyEctoparasiteAnalysisRoutes = Router();

const necropsyEctoparasiteAnalysisController = new NecropsyEctoparasiteAnalysisController();

necropsyEctoparasiteAnalysisRoutes.get('/necropsy-ectoparasite-analysis/get-all', authMiddleware(), necropsyEctoparasiteAnalysisController.getAll);
necropsyEctoparasiteAnalysisRoutes.get('/necropsy-ectoparasite-analysis/get-form-options', authMiddleware(), necropsyEctoparasiteAnalysisController.getFormOptions);
necropsyEctoparasiteAnalysisRoutes.post('/necropsy-ectoparasite-analysis/create', authMiddleware(), necropsyEctoparasiteAnalysisController.create);
necropsyEctoparasiteAnalysisRoutes.put('/necropsy-ectoparasite-analysis/update/:recordId', authMiddleware(), necropsyEctoparasiteAnalysisController.update);
necropsyEctoparasiteAnalysisRoutes.delete('/necropsy-ectoparasite-analysis/delete/:recordId', authMiddleware(), necropsyEctoparasiteAnalysisController.delete);
