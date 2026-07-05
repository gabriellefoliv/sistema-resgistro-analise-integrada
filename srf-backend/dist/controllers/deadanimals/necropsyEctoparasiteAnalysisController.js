"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NecropsyEctoparasiteAnalysisController = void 0;
const zod_1 = require("zod");
const necropsyEctoparasiteAnalysisService_1 = require("../../services/deadanimals/necropsyEctoparasiteAnalysisService");
const auditService_1 = require("../../services/auditService");
class NecropsyEctoparasiteAnalysisController {
    auditService = new auditService_1.AuditService();
    necropsyEctoparasiteAnalysisService = new necropsyEctoparasiteAnalysisService_1.NecropsyEctoparasiteAnalysisService();
    formId = 'analiseectoparasitos-av';
    tableName = 'ectoparasiteAnalysisNecropsy';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.necropsyEctoparasiteAnalysisService.getAll(requesterId);
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
            const options = await this.necropsyEctoparasiteAnalysisService.getFormOptions();
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
            const result = await this.necropsyEctoparasiteAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel criar uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).')
                return res.status(409).json({ error: error.message });
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
            const result = await this.necropsyEctoparasiteAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel atualizar para uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).')
                return res.status(409).json({ error: error.message });
            if (error.message === 'Análise de ectoparasito não encontrada.')
                return res.status(404).json({ error: error.message });
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
            const result = await this.necropsyEctoparasiteAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de ectoparasito não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.NecropsyEctoparasiteAnalysisController = NecropsyEctoparasiteAnalysisController;
//# sourceMappingURL=necropsyEctoparasiteAnalysisController.js.map