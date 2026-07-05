"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaccineRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const vaccineController_1 = require("../controllers/liveanimals/vaccineController");
exports.vaccineRoutes = (0, express_1.Router)();
const vaccineController = new vaccineController_1.VaccineController();
exports.vaccineRoutes.get('/vaccine/get-all', (0, authMiddleware_1.authMiddleware)(), vaccineController.getAll);
exports.vaccineRoutes.get('/vaccine/get-form-options', (0, authMiddleware_1.authMiddleware)(), vaccineController.getFormOptions);
exports.vaccineRoutes.post('/vaccine/create', (0, authMiddleware_1.authMiddleware)(), vaccineController.create);
exports.vaccineRoutes.put('/vaccine/update/:recordId', (0, authMiddleware_1.authMiddleware)(), vaccineController.update);
exports.vaccineRoutes.delete('/vaccine/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), vaccineController.delete);
//# sourceMappingURL=vaccineRoutes.js.map