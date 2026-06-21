import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NecropsySampleController } from "../controllers/deadanimals/necropsySampleController";

export const necropsySampleRoutes = Router();

const necropsySampleController = new NecropsySampleController();

necropsySampleRoutes.get('/necropsy-sample/get-all', authMiddleware(), necropsySampleController.getAll);
necropsySampleRoutes.get('/necropsy-sample/get-form-options', authMiddleware(), necropsySampleController.getFormOptions);
necropsySampleRoutes.post('/necropsy-sample/create', authMiddleware(), necropsySampleController.create);
necropsySampleRoutes.put('/necropsy-sample/update/:recordId', authMiddleware(), necropsySampleController.update);
necropsySampleRoutes.delete('/necropsy-sample/delete/:recordId', authMiddleware(), necropsySampleController.delete);
