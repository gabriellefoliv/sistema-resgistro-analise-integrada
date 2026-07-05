"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necropsyRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const necropsyController_1 = require("../controllers/deadanimals/necropsyController");
exports.necropsyRoutes = (0, express_1.Router)();
const necropsyController = new necropsyController_1.NecropsyController();
exports.necropsyRoutes.get('/necropsy/get-all', (0, authMiddleware_1.authMiddleware)(), necropsyController.getAll);
exports.necropsyRoutes.get('/necropsy/get-form-options', (0, authMiddleware_1.authMiddleware)(), necropsyController.getFormOptions);
exports.necropsyRoutes.post('/necropsy/create', (0, authMiddleware_1.authMiddleware)(), necropsyController.create);
exports.necropsyRoutes.put('/necropsy/update/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsyController.update);
exports.necropsyRoutes.delete('/necropsy/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsyController.delete);
//# sourceMappingURL=necropsyRoutes.js.map