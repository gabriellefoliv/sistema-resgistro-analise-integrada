import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { VaccineController } from "../controllers/liveanimals/vaccineController";

export const vaccineRoutes = Router();

const vaccineController = new VaccineController();

vaccineRoutes.get('/vaccine/get-all', authMiddleware(), vaccineController.getAll);
vaccineRoutes.get('/vaccine/get-form-options', authMiddleware(), vaccineController.getFormOptions);
vaccineRoutes.post('/vaccine/create', authMiddleware(), vaccineController.create);
vaccineRoutes.put('/vaccine/update/:recordId', authMiddleware(), vaccineController.update);
vaccineRoutes.delete('/vaccine/delete/:recordId', authMiddleware(), vaccineController.delete);