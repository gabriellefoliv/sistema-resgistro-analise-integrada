"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const interviewController_1 = require("../controllers/liveanimals/interviewController");
exports.interviewRoutes = (0, express_1.Router)();
const interviewController = new interviewController_1.InterviewController();
exports.interviewRoutes.get('/interview/get-all', (0, authMiddleware_1.authMiddleware)(), interviewController.getAll);
exports.interviewRoutes.get('/interview/get-form-options', (0, authMiddleware_1.authMiddleware)(), interviewController.getFormOptions);
exports.interviewRoutes.post('/interview/create', (0, authMiddleware_1.authMiddleware)(), interviewController.create);
exports.interviewRoutes.put('/interview/update/:recordId', (0, authMiddleware_1.authMiddleware)(), interviewController.update);
exports.interviewRoutes.delete('/interview/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), interviewController.delete);
//# sourceMappingURL=interviewRoutes.js.map