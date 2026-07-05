"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeterinarianSampleController = void 0;
const zod_1 = require("zod");
const veterinarianSampleService_1 = require("../../services/liveanimals/veterinarianSampleService");
const auditService_1 = require("../../services/auditService");
class VeterinarianSampleController {
    auditService = new auditService_1.AuditService();
    veterinarianSampleService = new veterinarianSampleService_1.VeterinarianSampleService();
    formId = 'amostras-av';
    tableName = 'sampleAllocationVeterinarian';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const samples = await this.veterinarianSampleService.getAll(requesterId);
            return res.status(200).json(samples);
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
            const options = await this.veterinarianSampleService.getFormOptions();
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
            const result = await this.veterinarianSampleService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Storage não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem visita veteriária e tipo.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da visita veterinária.')
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
            const result = await this.veterinarianSampleService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Storage não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não foi possível atualizar a amostra veterinária, pois já existe uma amostra que compartilha a mesma visita veterinária e tipo de amostra.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da visita veterinária.')
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
            const result = await this.veterinarianSampleService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra veterinária não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.VeterinarianSampleController = VeterinarianSampleController;
//# sourceMappingURL=veterinarianSampleController.js.map