"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorologyResultRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const sorologyResultController_1 = require("../controllers/liveanimals/sorologyResultController");
exports.sorologyResultRoutes = (0, express_1.Router)();
const sorologyResultController = new sorologyResultController_1.SorologyResultController();
exports.sorologyResultRoutes.get('/sorology-result/get-all', (0, authMiddleware_1.authMiddleware)(), sorologyResultController.getAll);
exports.sorologyResultRoutes.get('/sorology-result/get-form-options', (0, authMiddleware_1.authMiddleware)(), sorologyResultController.getFormOptions);
exports.sorologyResultRoutes.post('/sorology-result/create', (0, authMiddleware_1.authMiddleware)(), sorologyResultController.create);
exports.sorologyResultRoutes.put('/sorology-result/update/:recordId', (0, authMiddleware_1.authMiddleware)(), sorologyResultController.update);
exports.sorologyResultRoutes.delete('/sorology-result/delete/:recordId', (0, authMiddleware_1.authMiddleware)(), sorologyResultController.delete);
//# sourceMappingURL=sorologyResultRoutes.js.map