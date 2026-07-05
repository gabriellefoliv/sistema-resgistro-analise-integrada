"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoolAnalysisController = void 0;
const zod_1 = require("zod");
const stoolAnalysisService_1 = require("../../services/liveanimals/stoolAnalysisService");
const auditService_1 = require("../../services/auditService");
class StoolAnalysisController {
    auditService = new auditService_1.AuditService();
    stoolAnalysisService = new stoolAnalysisService_1.StoolAnalysisService();
    formId = 'analisefezes';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.stoolAnalysisService.getAll(requesterId);
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
            const options = await this.stoolAnalysisService.getFormOptions();
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
            const result = await this.stoolAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "stoolAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.stoolAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de fezes não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "stoolAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.stoolAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de fezes não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message.includes('Não é possível excluir'))
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.StoolAnalysisController = StoolAnalysisController;
//# sourceMappingURL=stoolAnalysisController.js.map