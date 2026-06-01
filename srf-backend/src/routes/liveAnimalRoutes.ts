import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { LiveAnimalController } from "../controllers/liveanimals/liveAnimalController";

export const liveAnimalRoutes = Router();

const liveAnimalController = new LiveAnimalController();

liveAnimalRoutes.get('/live-animal/get-all', authMiddleware(), liveAnimalController.getAll);
liveAnimalRoutes.get('/live-animal/get-form-options', authMiddleware(), liveAnimalController.getFormOptions);
liveAnimalRoutes.post('/live-animal/create', authMiddleware(), liveAnimalController.create);
liveAnimalRoutes.put('/live-animal/update/:recordId', authMiddleware(), liveAnimalController.update);
liveAnimalRoutes.delete('/live-animal/delete/:recordId', authMiddleware(), liveAnimalController.delete);