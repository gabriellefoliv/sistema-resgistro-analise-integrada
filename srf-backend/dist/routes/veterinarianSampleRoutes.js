"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.veterinarianSampleRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const veterinarianSampleController_1 = require("../controllers/liveanimals/veterinarianSampleController");
exports.veterinarianSampleRoutes = (0, express_1.Router)();
const veterinarianSampleController = new veterinarianSampleController_1.VeterinarianSampleController();
exports.veterinarianSampleRoutes.get('/veterinarian-sample/get-all', (0, authMiddleware_1.authMiddleware)(), veterinarianSampleController.getAll);
exports.veterinarianSampleRoutes.get('/veterinarian-sample/get-form-options', (0, authMiddleware_1.authMiddleware)(), veterinarianSampleController.getFormOptions);
exports.veterinarianSampleRoutes.post('/veterinarian-sample/create', (0, authMiddleware_1.authMiddleware)(), veterinarianSampleController.create);
exports.veterinarianSampleRoutes.put('/veterinarian-sample/update/:recordId', (0, authMiddleware_1.authMiddleware)(), veterinarianSampleController.update);
exports.veterinarianSampleRoutes.delete('/veterinarian-sample/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), veterinarianSampleController.delete);
//# sourceMappingURL=veterinarianSampleRoutes.js.map