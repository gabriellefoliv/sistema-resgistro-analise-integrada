"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deadAnimalRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const deadAnimalController_1 = require("../controllers/deadanimals/deadAnimalController");
exports.deadAnimalRoutes = (0, express_1.Router)();
const deadAnimalController = new deadAnimalController_1.DeadAnimalController();
exports.deadAnimalRoutes.get('/dead-animal/get-all', (0, authMiddleware_1.authMiddleware)(), deadAnimalController.getAll);
exports.deadAnimalRoutes.get('/dead-animal/get-form-options', (0, authMiddleware_1.authMiddleware)(), deadAnimalController.getFormOptions);
exports.deadAnimalRoutes.post('/dead-animal/create', (0, authMiddleware_1.authMiddleware)(), deadAnimalController.create);
exports.deadAnimalRoutes.put('/dead-animal/update/:recordId', (0, authMiddleware_1.authMiddleware)(), deadAnimalController.update);
exports.deadAnimalRoutes.delete('/dead-animal/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), deadAnimalController.delete);
//# sourceMappingURL=deadAnimalRoutes.js.map