"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastrationController = void 0;
const zod_1 = require("zod");
const castrationService_1 = require("../../services/liveanimals/castrationService");
const auditService_1 = require("../../services/auditService");
class CastrationController {
    auditService = new auditService_1.AuditService();
    castrationService = new castrationService_1.CastrationService();
    formId = 'castracao';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const castrations = await this.castrationService.getAll(requesterId);
            return res.status(200).json(castrations);
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
            const options = await this.castrationService.getFormOptions();
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
            const result = await this.castrationService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Este animal já possui uma castração registrada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Esta visita veterinária já possui uma castração associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser a mesma da data da visita veterinária associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser maior que a data de nascimento do animal.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "castration", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.castrationService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Castração não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Este animal já possui uma castração registrada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Esta visita veterinária já possui uma castração associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser a mesma da data da visita veterinária associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser maior que a data de nascimento do animal.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "castration", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.castrationService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Castração não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.CastrationController = CastrationController;
//# sourceMappingURL=castrationController.js.map