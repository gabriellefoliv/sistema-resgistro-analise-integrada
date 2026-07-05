"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necropsyEctoparasiteAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const necropsyEctoparasiteAnalysisController_1 = require("../controllers/deadanimals/necropsyEctoparasiteAnalysisController");
exports.necropsyEctoparasiteAnalysisRoutes = (0, express_1.Router)();
const necropsyEctoparasiteAnalysisController = new necropsyEctoparasiteAnalysisController_1.NecropsyEctoparasiteAnalysisController();
exports.necropsyEctoparasiteAnalysisRoutes.get('/necropsy-ectoparasite-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), necropsyEctoparasiteAnalysisController.getAll);
exports.necropsyEctoparasiteAnalysisRoutes.get('/necropsy-ectoparasite-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), necropsyEctoparasiteAnalysisController.getFormOptions);
exports.necropsyEctoparasiteAnalysisRoutes.post('/necropsy-ectoparasite-analysis/create', (0, authMiddleware_1.authMiddleware)(), necropsyEctoparasiteAnalysisController.create);
exports.necropsyEctoparasiteAnalysisRoutes.put('/necropsy-ectoparasite-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsyEctoparasiteAnalysisController.update);
exports.necropsyEctoparasiteAnalysisRoutes.delete('/necropsy-ectoparasite-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsyEctoparasiteAnalysisController.delete);
//# sourceMappingURL=necropsyEctoparasiteAnalysisRoutes.js.map