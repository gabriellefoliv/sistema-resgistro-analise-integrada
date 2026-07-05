"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NecropsySampleController = void 0;
const zod_1 = require("zod");
const necropsySampleService_1 = require("../../services/deadanimals/necropsySampleService");
const auditService_1 = require("../../services/auditService");
class NecropsySampleController {
    auditService = new auditService_1.AuditService();
    necropsySampleService = new necropsySampleService_1.NecropsySampleService();
    formId = 'amostras-am';
    tableName = 'sampleAllocationNecropsy';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.necropsySampleService.getAll(requesterId);
            return res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: 'Erro ao buscar amostras de necrópsia.' });
        }
    };
    getFormOptions = async (req, res) => {
        try {
            const options = await this.necropsySampleService.getFormOptions();
            return res.status(200).json(options);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: 'Erro ao buscar opções do formulário.' });
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
            const result = await this.necropsySampleService.create(data, requesterId);
            res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Armazenamento não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem necrópsia e tipo.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.')
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
            const result = await this.necropsySampleService.update(Number(recordId), data, requesterId);
            res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra de necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrada.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Armazenamento não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem necrópsia e tipo.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da necrópsia.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.')
                return res.status(400).json({ error: error.message });
            res.status(400).json({ error: error.message });
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
            const result = await this.necropsySampleService.delete(Number(recordId), requesterId);
            res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra de necrópsia não encontrada.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.NecropsySampleController = NecropsySampleController;
//# sourceMappingURL=necropsySampleController.js.map