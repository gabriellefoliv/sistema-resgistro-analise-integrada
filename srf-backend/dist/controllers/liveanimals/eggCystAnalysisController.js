"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggCystAnalysisController = void 0;
const zod_1 = require("zod");
const eggCystAnalysisService_1 = require("../../services/liveanimals/eggCystAnalysisService");
const auditService_1 = require("../../services/auditService");
class EggCystAnalysisController {
    auditService = new auditService_1.AuditService();
    eggCystAnalysisService = new eggCystAnalysisService_1.EggCystAnalysisService();
    formId = 'analiseovocistos';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.eggCystAnalysisService.getAll(requesterId);
            return res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    };
    getFormOptions = async (req, res) => {
        try {
            const options = await this.eggCystAnalysisService.getFormOptions();
            return res.status(200).json(options);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    };
    create = async (req, res) => {
        try {
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.eggCystAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar uma análise de ovos/cistos com a mesma espécie para a mesma análise de fezes.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "eggCystAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.eggCystAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de ovos/cistos não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar para uma análise de ovos/cistos com a mesma espécie para a mesma análise de fezes.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "eggCystAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.eggCystAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de ovos/cistos não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.EggCystAnalysisController = EggCystAnalysisController;
//# sourceMappingURL=eggCystAnalysisController.js.map