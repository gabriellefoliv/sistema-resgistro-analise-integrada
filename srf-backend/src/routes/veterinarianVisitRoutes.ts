import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { VeterinarianVisitController } from "../controllers/liveanimals/veterinarianVisitController";

export const veterinarianVisitRoutes = Router();

const veterinarianVisitController = new VeterinarianVisitController();

veterinarianVisitRoutes.get('/veterinarian-visit/get-all', authMiddleware(), veterinarianVisitController.getAll);
veterinarianVisitRoutes.get('/veterinarian-visit/form-options', authMiddleware(), veterinarianVisitController.getFormOptions);
veterinarianVisitRoutes.post('/veterinarian-visit/create', authMiddleware(), veterinarianVisitController.create);
veterinarianVisitRoutes.put('/veterinarian-visit/update/:id', authMiddleware(), veterinarianVisitController.update);
veterinarianVisitRoutes.delete('/veterinarian-visit/delete/:id', authMiddleware(), veterinarianVisitController.delete);

