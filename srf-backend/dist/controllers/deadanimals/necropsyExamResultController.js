"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NecropsyExamResultController = void 0;
const zod_1 = require("zod");
const necropsyExamResultService_1 = require("../../services/deadanimals/necropsyExamResultService");
const auditService_1 = require("../../services/auditService");
class NecropsyExamResultController {
    auditService = new auditService_1.AuditService();
    service = new necropsyExamResultService_1.NecropsyExamResultService();
    formId = 'resultadoexame-am';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.service.getAll(requesterId);
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
    // CPCR
    getCPCRFormOptions = async (req, res) => {
        try {
            const options = await this.service.getCPCRFormOptions();
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
    createCPCR = async (req, res) => {
        try {
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.service.createCPCR(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado CPCR para esta necrópsia e tipo de amostra.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A data de realização do exame não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    updateCPCR = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'cpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.service.updateCPCR(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado CPCR não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado CPCR para esta necrópsia e tipo de amostra.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A data de realização do exame não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    deleteCPCR = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'cpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.service.deleteCPCR(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado CPCR não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    // QPCR
    getQPCRFormOptions = async (req, res) => {
        try {
            const options = await this.service.getQPCRFormOptions();
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
    createQPCR = async (req, res) => {
        try {
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.service.createQPCR(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado QPCR para esta necrópsia e tipo de amostra.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A data de realização do exame não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    updateQPCR = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'qpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.service.updateQPCR(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado QPCR não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado QPCR para esta necrópsia e tipo de amostra.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'A data de realização do exame não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    deleteQPCR = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'qpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.service.deleteQPCR(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError)
                return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado QPCR não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.NecropsyExamResultController = NecropsyExamResultController;
//# sourceMappingURL=necropsyExamResultController.js.map