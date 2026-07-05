"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stoolAnalysisRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const stoolAnalysisController_1 = require("../controllers/liveanimals/stoolAnalysisController");
exports.stoolAnalysisRoutes = (0, express_1.Router)();
const stoolAnalysisController = new stoolAnalysisController_1.StoolAnalysisController();
exports.stoolAnalysisRoutes.get('/stool-analysis/get-all', (0, authMiddleware_1.authMiddleware)(), stoolAnalysisController.getAll);
exports.stoolAnalysisRoutes.get('/stool-analysis/get-form-options', (0, authMiddleware_1.authMiddleware)(), stoolAnalysisController.getFormOptions);
exports.stoolAnalysisRoutes.post('/stool-analysis/create', (0, authMiddleware_1.authMiddleware)(), stoolAnalysisController.create);
exports.stoolAnalysisRoutes.put('/stool-analysis/update/:recordId', (0, authMiddleware_1.authMiddleware)(), stoolAnalysisController.update);
exports.stoolAnalysisRoutes.delete('/stool-analysis/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), stoolAnalysisController.delete);
//# sourceMappingURL=stoolAnalysisRoutes.js.map