"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EctoparasiteAnalysisController = void 0;
const zod_1 = require("zod");
const ectoparasiteAnalysisService_1 = require("../../services/liveanimals/ectoparasiteAnalysisService");
const auditService_1 = require("../../services/auditService");
class EctoparasiteAnalysisController {
    auditService = new auditService_1.AuditService();
    ectoparasiteAnalysisService = new ectoparasiteAnalysisService_1.EctoparasiteAnalysisService();
    formId = 'analiseectoparasitos-av';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.ectoparasiteAnalysisService.getAll(requesterId);
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
            const options = await this.ectoparasiteAnalysisService.getFormOptions();
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
            const result = await this.ectoparasiteAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel criar uma análise de ectoparasitos com informações repetidas (visita veterinária, gênero, espécie e subespécie).')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "ectoparasiteAnalysisVeterinarian", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.ectoparasiteAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel atualizar para uma análise de ectoparasitos com informações repetidas (visita veterinária, gênero, espécie e subespécie).')
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
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "ectoparasiteAnalysisVeterinarian", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.ectoparasiteAnalysisService.delete(Number(recordId), requesterId);
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
exports.EctoparasiteAnalysisController = EctoparasiteAnalysisController;
//# sourceMappingURL=ectoparasiteAnalysisController.js.map