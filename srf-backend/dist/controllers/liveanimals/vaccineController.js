"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccineController = void 0;
const zod_1 = require("zod");
const vaccineService_1 = require("../../services/liveanimals/vaccineService");
const auditService_1 = require("../../services/auditService");
class VaccineController {
    auditService = new auditService_1.AuditService();
    vaccineService = new vaccineService_1.VaccineService();
    formId = 'vacina';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const vaccines = await this.vaccineService.getAll(requesterId);
            return res.status(200).json(vaccines);
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
            const options = await this.vaccineService.getFormOptions();
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
            const result = await this.vaccineService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Vacina não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de aplicação da vacina não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Esta vacina já foi aplicada neste animal nesta data.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "vaccineApplication", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.vaccineService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Aplicação da vacina não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Vacina não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de aplicação da vacina não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Aplicação da vacina já existe.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Esta vacina já foi aplicada neste animal nesta data.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "vaccineApplication", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.vaccineService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Aplicação da vacina não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.VaccineController = VaccineController;
//# sourceMappingURL=vaccineController.js.map