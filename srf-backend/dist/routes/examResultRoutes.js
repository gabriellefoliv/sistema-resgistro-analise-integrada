"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examResultRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const examResultController_1 = require("../controllers/liveanimals/examResultController");
exports.examResultRoutes = (0, express_1.Router)();
const examResultController = new examResultController_1.ExamResultController();
exports.examResultRoutes.get('/exam-result/get-all', (0, authMiddleware_1.authMiddleware)(), examResultController.getAll);
exports.examResultRoutes.get('/exam-result/get-form-options', (0, authMiddleware_1.authMiddleware)(), examResultController.getFormOptions);
exports.examResultRoutes.post('/exam-result/create', (0, authMiddleware_1.authMiddleware)(), examResultController.create);
exports.examResultRoutes.put('/exam-result/update/:recordId', (0, authMiddleware_1.authMiddleware)(), examResultController.update);
exports.examResultRoutes.delete('/exam-result/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), examResultController.delete);
//# sourceMappingURL=examResultRoutes.js.map