import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { DeadAnimalController } from "../controllers/deadanimals/deadAnimalController";

export const deadAnimalRoutes = Router();

const deadAnimalController = new DeadAnimalController();

deadAnimalRoutes.get('/dead-animal/get-all', authMiddleware(), deadAnimalController.getAll);
deadAnimalRoutes.get('/dead-animal/get-form-options', authMiddleware(), deadAnimalController.getFormOptions);
deadAnimalRoutes.post('/dead-animal/create', authMiddleware(), deadAnimalController.create);
deadAnimalRoutes.put('/dead-animal/update/:recordId', authMiddleware(), deadAnimalController.update);
deadAnimalRoutes.delete('/dead-animal/delete/:recordId', authMiddleware(), deadAnimalController.delete);
