"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helminthAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const helminthAnalysisController_1 = require("../controllers/deadanimals/helminthAnalysisController");
exports.helminthAnalysisRoutes = (0, express_1.Router)();
const helminthAnalysisController = new helminthAnalysisController_1.HelminthAnalysisController();
exports.helminthAnalysisRoutes.get('/helminth-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), helminthAnalysisController.getAll);
exports.helminthAnalysisRoutes.get('/helminth-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), helminthAnalysisController.getFormOptions);
exports.helminthAnalysisRoutes.post('/helminth-analysis/create', (0, authMiddleware_1.authMiddleware)(), helminthAnalysisController.create);
exports.helminthAnalysisRoutes.put('/helminth-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), helminthAnalysisController.update);
exports.helminthAnalysisRoutes.delete('/helminth-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), helminthAnalysisController.delete);
//# sourceMappingURL=helminthAnalysisRoutes.js.map