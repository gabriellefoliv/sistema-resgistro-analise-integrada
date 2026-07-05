"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const groupController_1 = require("../controllers/groupController");
exports.groupRoutes = (0, express_1.Router)();
const groupController = new groupController_1.GroupController();
exports.groupRoutes.get('/group/get-all', (0, authMiddleware_1.authMiddleware)('admin'), groupController.getAllGroups);
//# sourceMappingURL=groupRoutes.js.map