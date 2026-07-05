"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tutorController_1 = require("../controllers/liveanimals/tutorController");
exports.tutorRoutes = (0, express_1.Router)();
const tutorController = new tutorController_1.TutorController();
exports.tutorRoutes.get('/tutor/get-all', (0, authMiddleware_1.authMiddleware)(), tutorController.getAll);
exports.tutorRoutes.get('/tutor/get-form-options', (0, authMiddleware_1.authMiddleware)(), tutorController.getFormOptions);
exports.tutorRoutes.post('/tutor/create', (0, authMiddleware_1.authMiddleware)(), tutorController.create);
exports.tutorRoutes.put('/tutor/update/:recordId', (0, authMiddleware_1.authMiddleware)(), tutorController.update);
exports.tutorRoutes.delete('/tutor/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), tutorController.delete);
//# sourceMappingURL=tutorRoutes.js.map