"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const formController_1 = require("../controllers/formController");
exports.formRoutes = (0, express_1.Router)();
const formController = new formController_1.FormController();
exports.formRoutes.get('/navigation/options', (0, authMiddleware_1.authMiddleware)(), formController.getNavigationOptions);
exports.formRoutes.get('/form/get-all', (0, authMiddleware_1.authMiddleware)(), formController.getForms);
exports.formRoutes.get('/access-level/get-all', (0, authMiddleware_1.authMiddleware)(), formController.getAccessLevel);
//# sourceMappingURL=formRoutes.js.map