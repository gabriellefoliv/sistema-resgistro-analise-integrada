"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NecropsyController = void 0;
const zod_1 = require("zod");
const necropsyService_1 = require("../../services/deadanimals/necropsyService");
const auditService_1 = require("../../services/auditService");
class NecropsyController {
    auditService = new auditService_1.AuditService();
    necropsyService = new necropsyService_1.NecropsyService();
    formId = 'necropsia';
    tableName = 'necropsy';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.necropsyService.getAll(requesterId);
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
            const options = await this.necropsyService.getFormOptions();
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
            const result = await this.necropsyService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Já existe uma necrópsia para este animal.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'Não é possível criar uma necrópsia com o tipo de medida corporal duplicado.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da necrópsia não pode ser anterior à data da coleta do animal.')
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
            const result = await this.necropsyService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma necrópsia para este animal.')
                return res.status(409).json({ error: error.message });
            if (error.message === 'Não é possível alterar uma necrópsia com o tipo de medida corporal duplicado.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da necrópsia não pode ser anterior à data da coleta do animal.')
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
            const result = await this.necropsyService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível excluir esta necrópsia pois existem registros associados vinculados a ela. Remova os registros associados antes de excluir a necrópsia.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.NecropsyController = NecropsyController;
//# sourceMappingURL=necropsyController.js.map