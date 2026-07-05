"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAnimalController = void 0;
const zod_1 = require("zod");
const liveAnimalService_1 = require("../../services/liveanimals/liveAnimalService");
const auditService_1 = require("../../services/auditService");
class LiveAnimalController {
    auditService = new auditService_1.AuditService();
    liveAnimalService = new liveAnimalService_1.LiveAnimalService();
    formId = 'animal-av';
    tableName = 'liveAnimal';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.liveAnimalService.getAll(requesterId);
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
            const options = await this.liveAnimalService.getFormOptions();
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
            const result = await this.liveAnimalService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Este tutor já possui um animal com este nome.')
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
            const result = await this.liveAnimalService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Este tutor já possui um animal com este nome.')
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
            const result = await this.liveAnimalService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Este animal possui registros associados e não pode ser deletado. Remova os registros associados antes de deletar o animal.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.LiveAnimalController = LiveAnimalController;
//# sourceMappingURL=liveAnimalController.js.map