import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { GpsTrackingController } from "../controllers/liveanimals/gpsTrackingController";

export const gpsTrackingRoutes = Router();

const gpsTrackingController = new GpsTrackingController();

gpsTrackingRoutes.get('/gps-tracking/get-all', authMiddleware(), gpsTrackingController.getAll);
gpsTrackingRoutes.get('/gps-tracking/get-form-options', authMiddleware(), gpsTrackingController.getFormOptions);
gpsTrackingRoutes.post('/gps-tracking/create', authMiddleware(), gpsTrackingController.create);
gpsTrackingRoutes.put('/gps-tracking/update/:recordId', authMiddleware(), gpsTrackingController.update);
gpsTrackingRoutes.delete('/gps-tracking/delete/:recordId', authMiddleware(), gpsTrackingController.delete);
