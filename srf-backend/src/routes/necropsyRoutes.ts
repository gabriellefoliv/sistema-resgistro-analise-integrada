import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NecropsyController } from "../controllers/deadanimals/necropsyController";

export const necropsyRoutes = Router();

const necropsyController = new NecropsyController();

necropsyRoutes.get('/necropsy/get-all', authMiddleware(), necropsyController.getAll);
necropsyRoutes.get('/necropsy/get-form-options', authMiddleware(), necropsyController.getFormOptions);
necropsyRoutes.post('/necropsy/create', authMiddleware(), necropsyController.create);
necropsyRoutes.put('/necropsy/update/:recordId', authMiddleware(), necropsyController.update);
necropsyRoutes.delete('/necropsy/delete/:recordId', authMiddleware(), necropsyController.delete);
