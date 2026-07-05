"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eggCystAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const eggCystAnalysisController_1 = require("../controllers/liveanimals/eggCystAnalysisController");
exports.eggCystAnalysisRoutes = (0, express_1.Router)();
const eggCystAnalysisController = new eggCystAnalysisController_1.EggCystAnalysisController();
exports.eggCystAnalysisRoutes.get('/egg-cyst-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), eggCystAnalysisController.getAll);
exports.eggCystAnalysisRoutes.get('/egg-cyst-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), eggCystAnalysisController.getFormOptions);
exports.eggCystAnalysisRoutes.post('/egg-cyst-analysis/create', (0, authMiddleware_1.authMiddleware)(), eggCystAnalysisController.create);
exports.eggCystAnalysisRoutes.put('/egg-cyst-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), eggCystAnalysisController.update);
exports.eggCystAnalysisRoutes.delete('/egg-cyst-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), eggCystAnalysisController.delete);
//# sourceMappingURL=eggCystAnalysisRoutes.js.map