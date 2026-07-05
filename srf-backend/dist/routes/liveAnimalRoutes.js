"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveAnimalRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const liveAnimalController_1 = require("../controllers/liveanimals/liveAnimalController");
exports.liveAnimalRoutes = (0, express_1.Router)();
const liveAnimalController = new liveAnimalController_1.LiveAnimalController();
exports.liveAnimalRoutes.get('/live-animal/get-all', (0, authMiddleware_1.authMiddleware)(), liveAnimalController.getAll);
exports.liveAnimalRoutes.get('/live-animal/get-form-options', (0, authMiddleware_1.authMiddleware)(), liveAnimalController.getFormOptions);
exports.liveAnimalRoutes.post('/live-animal/create', (0, authMiddleware_1.authMiddleware)(), liveAnimalController.create);
exports.liveAnimalRoutes.put('/live-animal/update/:recordId', (0, authMiddleware_1.authMiddleware)(), liveAnimalController.update);
exports.liveAnimalRoutes.delete('/live-animal/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), liveAnimalController.delete);
//# sourceMappingURL=liveAnimalRoutes.js.map