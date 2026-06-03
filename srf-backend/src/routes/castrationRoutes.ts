import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CastrationController } from "../controllers/liveanimals/castrationController";

export const castrationRoutes = Router();

const castrationController = new CastrationController();

castrationRoutes.get('/castration/get-all', authMiddleware(), castrationController.getAll);
castrationRoutes.get('/castration/get-form-options', authMiddleware(), castrationController.getFormOptions);
castrationRoutes.post('/castration/create', authMiddleware(), castrationController.create);
castrationRoutes.put('/castration/update/:recordId', authMiddleware(), castrationController.update);
castrationRoutes.delete('/castration/delete/:recordId', authMiddleware(), castrationController.delete);
