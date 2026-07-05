"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ectoparasiteAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ectoparasiteAnalysisController_1 = require("../controllers/liveanimals/ectoparasiteAnalysisController");
exports.ectoparasiteAnalysisRoutes = (0, express_1.Router)();
const ectoparasiteAnalysisController = new ectoparasiteAnalysisController_1.EctoparasiteAnalysisController();
exports.ectoparasiteAnalysisRoutes.get('/ectoparasite-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), ectoparasiteAnalysisController.getAll);
exports.ectoparasiteAnalysisRoutes.get('/ectoparasite-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), ectoparasiteAnalysisController.getFormOptions);
exports.ectoparasiteAnalysisRoutes.post('/ectoparasite-analysis/create', (0, authMiddleware_1.authMiddleware)(), ectoparasiteAnalysisController.create);
exports.ectoparasiteAnalysisRoutes.put('/ectoparasite-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), ectoparasiteAnalysisController.update);
exports.ectoparasiteAnalysisRoutes.delete('/ectoparasite-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), ectoparasiteAnalysisController.delete);
//# sourceMappingURL=ectoparasiteAnalysisRoutes.js.map