import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MolecularAnalysisController } from "../controllers/liveanimals/molecularAnalysisController";

export const molecularAnalysisRoutes = Router();

const molecularAnalysisController = new MolecularAnalysisController();

molecularAnalysisRoutes.get('/molecular-analysis/get-all', authMiddleware(), molecularAnalysisController.getAll);
molecularAnalysisRoutes.get('/molecular-analysis/get-form-options', authMiddleware(), molecularAnalysisController.getFormOptions);
molecularAnalysisRoutes.post('/molecular-analysis/create', authMiddleware(), molecularAnalysisController.create);
molecularAnalysisRoutes.put('/molecular-analysis/update/:recordId', authMiddleware(), molecularAnalysisController.update);
molecularAnalysisRoutes.delete('/molecular-analysis/delete/:recordId', authMiddleware(), molecularAnalysisController.delete);
