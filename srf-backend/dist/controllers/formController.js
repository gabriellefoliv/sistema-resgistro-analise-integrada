"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const formService_1 = require("../services/formService");
class FormController {
    async getNavigationOptions(req, res) {
        const formService = new formService_1.FormService();
        const options = await formService.getNavigationOptions();
        return res.status(200).json(options);
    }
    async getForms(req, res) {
        const formService = new formService_1.FormService();
        const forms = await formService.getForms();
        return res.status(200).json(forms);
    }
    async getAccessLevel(req, res) {
        const formService = new formService_1.FormService();
        const accessLevel = await formService.getAccessLevel();
        return res.status(200).json(accessLevel);
    }
}
exports.FormController = FormController;
//# sourceMappingURL=formController.js.map