"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicRegistrationRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const basicRegistrationController_1 = require("../controllers/basicRegistrationController");
exports.basicRegistrationRoutes = (0, express_1.Router)();
// Animais Vivos
exports.basicRegistrationRoutes.get('/basic-registration-la/get-all', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.liveAnimalRegistrationController.getAll);
exports.basicRegistrationRoutes.get('/basic-registration-la/get-form-options', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.liveAnimalRegistrationController.getFormOptions);
exports.basicRegistrationRoutes.post('/basic-registration-la/create', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.liveAnimalRegistrationController.create);
exports.basicRegistrationRoutes.put('/basic-registration-la/update/:recordId', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.liveAnimalRegistrationController.update);
exports.basicRegistrationRoutes.delete('/basic-registration-la/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.liveAnimalRegistrationController.delete);
// Animais Mortos
exports.basicRegistrationRoutes.get('/basic-registration-da/get-all', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.deadAnimalRegistrationController.getAll);
exports.basicRegistrationRoutes.get('/basic-registration-da/get-form-options', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.deadAnimalRegistrationController.getFormOptions);
exports.basicRegistrationRoutes.post('/basic-registration-da/create', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.deadAnimalRegistrationController.create);
exports.basicRegistrationRoutes.put('/basic-registration-da/update/:recordId', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.deadAnimalRegistrationController.update);
exports.basicRegistrationRoutes.delete('/basic-registration-da/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), basicRegistrationController_1.deadAnimalRegistrationController.delete);
//# sourceMappingURL=basicRegistrationRoutes.js.map