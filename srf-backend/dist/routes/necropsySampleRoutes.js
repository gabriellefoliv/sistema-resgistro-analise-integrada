"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necropsySampleRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const necropsySampleController_1 = require("../controllers/deadanimals/necropsySampleController");
exports.necropsySampleRoutes = (0, express_1.Router)();
const necropsySampleController = new necropsySampleController_1.NecropsySampleController();
exports.necropsySampleRoutes.get('/necropsy-sample/get-all', (0, authMiddleware_1.authMiddleware)(), necropsySampleController.getAll);
exports.necropsySampleRoutes.get('/necropsy-sample/get-form-options', (0, authMiddleware_1.authMiddleware)(), necropsySampleController.getFormOptions);
exports.necropsySampleRoutes.post('/necropsy-sample/create', (0, authMiddleware_1.authMiddleware)(), necropsySampleController.create);
exports.necropsySampleRoutes.put('/necropsy-sample/update/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsySampleController.update);
exports.necropsySampleRoutes.delete('/necropsy-sample/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), necropsySampleController.delete);
//# sourceMappingURL=necropsySampleRoutes.js.map