import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { VeterinarianSampleController } from "../controllers/liveanimals/veterinarianSampleController";

export const veterinarianSampleRoutes = Router();

const veterinarianSampleController = new VeterinarianSampleController();

veterinarianSampleRoutes.get('/veterinarian-sample/get-all', authMiddleware(), veterinarianSampleController.getAll);
veterinarianSampleRoutes.get('/veterinarian-sample/get-form-options', authMiddleware(), veterinarianSampleController.getFormOptions);
veterinarianSampleRoutes.post('/veterinarian-sample/create', authMiddleware(), veterinarianSampleController.create);
veterinarianSampleRoutes.put('/veterinarian-sample/update/:recordId', authMiddleware(), veterinarianSampleController.update);
veterinarianSampleRoutes.delete('/veterinarian-sample/delete/:recordId', authMiddleware(), veterinarianSampleController.delete);