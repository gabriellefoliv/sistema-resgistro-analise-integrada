"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadAnimalController = void 0;
const zod_1 = require("zod");
const deadAnimalService_1 = require("../../services/deadanimals/deadAnimalService");
const auditService_1 = require("../../services/auditService");
class DeadAnimalController {
    auditService = new auditService_1.AuditService();
    deadAnimalService = new deadAnimalService_1.DeadAnimalService();
    formId = 'animal-am';
    tableName = 'deadAnimal';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.deadAnimalService.getAll(requesterId);
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
            const options = await this.deadAnimalService.getFormOptions();
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
            const result = await this.deadAnimalService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Já existe um animal morto com este código.')
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
            const result = await this.deadAnimalService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal morto não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um animal morto com este código.')
                return res.status(409).json({ error: error.message });
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
            const result = await this.deadAnimalService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal morto não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Este animal morto possui uma necrópsia associada e não pode ser deletado. Remova a necrópsia antes de deletar o animal morto.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.DeadAnimalController = DeadAnimalController;
//# sourceMappingURL=deadAnimalController.js.map