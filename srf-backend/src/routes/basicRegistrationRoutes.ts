import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { liveAnimalRegistrationController, deadAnimalRegistrationController } from "../controllers/basicRegistrationController";

export const basicRegistrationRoutes = Router();

// Animais Vivos
basicRegistrationRoutes.get('/basic-registration-la/get-all', authMiddleware(), liveAnimalRegistrationController.getAll);
basicRegistrationRoutes.get('/basic-registration-la/get-form-options', authMiddleware(), liveAnimalRegistrationController.getFormOptions);
basicRegistrationRoutes.post('/basic-registration-la/create', authMiddleware(), liveAnimalRegistrationController.create);
basicRegistrationRoutes.put('/basic-registration-la/update/:recordId', authMiddleware(), liveAnimalRegistrationController.update);
basicRegistrationRoutes.delete('/basic-registration-la/delete/:recordId', authMiddleware(), liveAnimalRegistrationController.delete);

// Animais Mortos
basicRegistrationRoutes.get('/basic-registration-da/get-all', authMiddleware(), deadAnimalRegistrationController.getAll);
basicRegistrationRoutes.get('/basic-registration-da/get-form-options', authMiddleware(), deadAnimalRegistrationController.getFormOptions);
basicRegistrationRoutes.post('/basic-registration-da/create', authMiddleware(), deadAnimalRegistrationController.create);
basicRegistrationRoutes.put('/basic-registration-da/update/:recordId', authMiddleware(), deadAnimalRegistrationController.update);
basicRegistrationRoutes.delete('/basic-registration-da/delete/:recordId', authMiddleware(), deadAnimalRegistrationController.delete);
