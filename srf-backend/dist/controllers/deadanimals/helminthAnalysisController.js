"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelminthAnalysisController = void 0;
const zod_1 = require("zod");
const helmithAnalysisService_1 = require("../../services/deadanimals/helmithAnalysisService");
const auditService_1 = require("../../services/auditService");
class HelminthAnalysisController {
    auditService = new auditService_1.AuditService();
    helminthAnalysisService = new helmithAnalysisService_1.HelminthAnalysisService();
    formId = 'analisehelmintos';
    tableName = 'helminthAnalysis';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.helminthAnalysisService.getAll(requesterId);
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
            const options = await this.helminthAnalysisService.getFormOptions();
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
            const result = await this.helminthAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necropsia não encontrada.' || error.message === 'Espécie de helminto não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma análise de helminto para esta necropsia e espécie de helminto.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A soma de machos e fêmeas deve ser igual ou inferior ao total.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.helminthAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de helminto não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Necropsia não encontrada.' || error.message === 'Espécie de helminto não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma análise de helminto para esta necropsia e espécie de helminto.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A soma de machos e fêmeas deve ser igual ou inferior ao total.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.helminthAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de helminto não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.HelminthAnalysisController = HelminthAnalysisController;
//# sourceMappingURL=helminthAnalysisController.js.map