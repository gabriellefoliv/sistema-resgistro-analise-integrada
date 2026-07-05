"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpsTrackingRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const gpsTrackingController_1 = require("../controllers/liveanimals/gpsTrackingController");
exports.gpsTrackingRoutes = (0, express_1.Router)();
const gpsTrackingController = new gpsTrackingController_1.GpsTrackingController();
exports.gpsTrackingRoutes.get('/gps-tracking/get-all', (0, authMiddleware_1.authMiddleware)(), gpsTrackingController.getAll);
exports.gpsTrackingRoutes.get('/gps-tracking/get-form-options', (0, authMiddleware_1.authMiddleware)(), gpsTrackingController.getFormOptions);
exports.gpsTrackingRoutes.post('/gps-tracking/create', (0, authMiddleware_1.authMiddleware)(), gpsTrackingController.create);
exports.gpsTrackingRoutes.put('/gps-tracking/update/:recordId', (0, authMiddleware_1.authMiddleware)(), gpsTrackingController.update);
exports.gpsTrackingRoutes.delete('/gps-tracking/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), gpsTrackingController.delete);
//# sourceMappingURL=gpsTrackingRoutes.js.map