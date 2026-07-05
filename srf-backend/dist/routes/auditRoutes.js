"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const auditController_1 = require("../controllers/auditController");
exports.auditRoutes = (0, express_1.Router)();
const auditController = new auditController_1.AuditController();
exports.auditRoutes.get('/audit/can-edit', (0, authMiddleware_1.authMiddleware)(), auditController.checkEditPermission);
//# sourceMappingURL=auditRoutes.js.map