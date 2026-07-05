"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.molecularAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const molecularAnalysisController_1 = require("../controllers/liveanimals/molecularAnalysisController");
exports.molecularAnalysisRoutes = (0, express_1.Router)();
const molecularAnalysisController = new molecularAnalysisController_1.MolecularAnalysisController();
exports.molecularAnalysisRoutes.get('/molecular-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), molecularAnalysisController.getAll);
exports.molecularAnalysisRoutes.get('/molecular-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), molecularAnalysisController.getFormOptions);
exports.molecularAnalysisRoutes.post('/molecular-analysis/create', (0, authMiddleware_1.authMiddleware)(), molecularAnalysisController.create);
exports.molecularAnalysisRoutes.put('/molecular-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), molecularAnalysisController.update);
exports.molecularAnalysisRoutes.delete('/molecular-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), molecularAnalysisController.delete);
//# sourceMappingURL=molecularAnalysisRoutes.js.map