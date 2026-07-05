"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.veterinarianVisitRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const veterinarianVisitController_1 = require("../controllers/liveanimals/veterinarianVisitController");
exports.veterinarianVisitRoutes = (0, express_1.Router)();
const veterinarianVisitController = new veterinarianVisitController_1.VeterinarianVisitController();
exports.veterinarianVisitRoutes.get('/veterinarian-visit/get-all', (0, authMiddleware_1.authMiddleware)(), veterinarianVisitController.getAll);
exports.veterinarianVisitRoutes.get('/veterinarian-visit/form-options', (0, authMiddleware_1.authMiddleware)(), veterinarianVisitController.getFormOptions);
exports.veterinarianVisitRoutes.post('/veterinarian-visit/create', (0, authMiddleware_1.authMiddleware)(), veterinarianVisitController.create);
exports.veterinarianVisitRoutes.put('/veterinarian-visit/update/:id', (0, authMiddleware_1.authMiddleware)(), veterinarianVisitController.update);
exports.veterinarianVisitRoutes.delete('/veterinarian-visit/delete/:id', (0, authMiddleware_1.authMiddleware)(), veterinarianVisitController.delete);
//# sourceMappingURL=veterinarianVisitRoutes.js.map