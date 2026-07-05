"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalExamController = void 0;
const zod_1 = require("zod");
const physicalExamService_1 = require("../../services/liveanimals/physicalExamService");
const auditService_1 = require("../../services/auditService");
class PhysicalExamController {
    auditService = new auditService_1.AuditService();
    physicalExamService = new physicalExamService_1.PhysicalExamService();
    formId = 'examefisico';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const exams = await this.physicalExamService.getAll(requesterId);
            return res.status(200).json(exams);
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
            const options = await this.physicalExamService.getFormOptions();
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
            const exam = await this.physicalExamService.create(data, requesterId);
            return res.status(201).json(exam);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar um exame físico para uma visita veterinária que já possui um exame físico.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "physicalExam", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const exam = await this.physicalExamService.update(Number(recordId), data, requesterId);
            return res.status(200).json(exam);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Exame físico não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar um exame físico para uma visita veterinária que já possui um exame físico.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "physicalExam", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.physicalExamService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Exame físico não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.PhysicalExamController = PhysicalExamController;
//# sourceMappingURL=physicalExamController.js.map