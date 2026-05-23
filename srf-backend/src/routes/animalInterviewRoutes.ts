import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AnimalInterviewController } from "../controllers/animalInterviewController";

export const animalInterviewRoutes = Router();

const animalInterviewController = new AnimalInterviewController();

animalInterviewRoutes.get('/animal-interview/get-all', authMiddleware(), animalInterviewController.getAll);
animalInterviewRoutes.get('/animal-interview/get-form-options', authMiddleware(), animalInterviewController.getFormOptions);
animalInterviewRoutes.post('/animal-interview/create', authMiddleware(), animalInterviewController.create);
animalInterviewRoutes.put('/animal-interview/update/:recordId', authMiddleware(), animalInterviewController.update);
animalInterviewRoutes.delete('/animal-interview/delete/:recordId', authMiddleware(), animalInterviewController.delete);
