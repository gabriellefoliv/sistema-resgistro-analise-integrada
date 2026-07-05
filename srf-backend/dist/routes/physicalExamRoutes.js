"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.physicalExamRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const physicalExamController_1 = require("../controllers/liveanimals/physicalExamController");
exports.physicalExamRoutes = (0, express_1.Router)();
const physicalExamController = new physicalExamController_1.PhysicalExamController();
exports.physicalExamRoutes.get('/physical-exam/get-all', (0, authMiddleware_1.authMiddleware)(), physicalExamController.getAll);
exports.physicalExamRoutes.get('/physical-exam/get-form-options', (0, authMiddleware_1.authMiddleware)(), physicalExamController.getFormOptions);
exports.physicalExamRoutes.post('/physical-exam/create', (0, authMiddleware_1.authMiddleware)(), physicalExamController.create);
exports.physicalExamRoutes.put('/physical-exam/update/:recordId', (0, authMiddleware_1.authMiddleware)(), physicalExamController.update);
exports.physicalExamRoutes.delete('/physical-exam/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), physicalExamController.delete);
//# sourceMappingURL=physicalExamRoutes.js.map