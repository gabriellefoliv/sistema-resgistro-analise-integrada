"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castrationRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const castrationController_1 = require("../controllers/liveanimals/castrationController");
exports.castrationRoutes = (0, express_1.Router)();
const castrationController = new castrationController_1.CastrationController();
exports.castrationRoutes.get('/castration/get-all', (0, authMiddleware_1.authMiddleware)(), castrationController.getAll);
exports.castrationRoutes.get('/castration/get-form-options', (0, authMiddleware_1.authMiddleware)(), castrationController.getFormOptions);
exports.castrationRoutes.post('/castration/create', (0, authMiddleware_1.authMiddleware)(), castrationController.create);
exports.castrationRoutes.put('/castration/update/:recordId', (0, authMiddleware_1.authMiddleware)(), castrationController.update);
exports.castrationRoutes.delete('/castration/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), castrationController.delete);
//# sourceMappingURL=castrationRoutes.js.map