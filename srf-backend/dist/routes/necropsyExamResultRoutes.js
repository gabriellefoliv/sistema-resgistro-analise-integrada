"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necropsyExamResultRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const necropsyExamResultController_1 = require("../controllers/deadanimals/necropsyExamResultController");
exports.necropsyExamResultRoutes = (0, express_1.Router)();
const controller = new necropsyExamResultController_1.NecropsyExamResultController();
// Geral
exports.necropsyExamResultRoutes.get('/necropsy-exam-result/get-all', (0, authMiddleware_1.authMiddleware)(), controller.getAll);
// CPCR
exports.necropsyExamResultRoutes.get('/necropsy-exam-result/cpcr/get-form-options', (0, authMiddleware_1.authMiddleware)(), controller.getCPCRFormOptions);
exports.necropsyExamResultRoutes.post('/necropsy-exam-result/cpcr/create', (0, authMiddleware_1.authMiddleware)(), controller.createCPCR);
exports.necropsyExamResultRoutes.put('/necropsy-exam-result/cpcr/update/:recordId', (0, authMiddleware_1.authMiddleware)(), controller.updateCPCR);
exports.necropsyExamResultRoutes.delete('/necropsy-exam-result/cpcr/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), controller.deleteCPCR);
// QPCR
exports.necropsyExamResultRoutes.get('/necropsy-exam-result/qpcr/get-form-options', (0, authMiddleware_1.authMiddleware)(), controller.getQPCRFormOptions);
exports.necropsyExamResultRoutes.post('/necropsy-exam-result/qpcr/create', (0, authMiddleware_1.authMiddleware)(), controller.createQPCR);
exports.necropsyExamResultRoutes.put('/necropsy-exam-result/qpcr/update/:recordId', (0, authMiddleware_1.authMiddleware)(), controller.updateQPCR);
exports.necropsyExamResultRoutes.delete('/necropsy-exam-result/qpcr/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), controller.deleteQPCR);
//# sourceMappingURL=necropsyExamResultRoutes.js.map