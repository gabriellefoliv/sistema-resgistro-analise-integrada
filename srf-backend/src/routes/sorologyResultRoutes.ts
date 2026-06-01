import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { SorologyResultController } from "../controllers/liveanimals/sorologyResultController";

export const sorologyResultRoutes = Router();

const sorologyResultController = new SorologyResultController();

sorologyResultRoutes.get('/sorology-result/get-all', authMiddleware(), sorologyResultController.getAll);
sorologyResultRoutes.get('/sorology-result/get-form-options', authMiddleware(), sorologyResultController.getFormOptions);
sorologyResultRoutes.post('/sorology-result/create', authMiddleware(), sorologyResultController.create);
sorologyResultRoutes.put('/sorology-result/update/:recordId', authMiddleware(), sorologyResultController.update);
sorologyResultRoutes.delete('/sorology-result/delete/:recordId', authMiddleware(), sorologyResultController.delete);
