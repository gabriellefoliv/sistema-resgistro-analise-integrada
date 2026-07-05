"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpsTrackingController = void 0;
const zod_1 = require("zod");
const gpsTrackingService_1 = require("../../services/liveanimals/gpsTrackingService");
const auditService_1 = require("../../services/auditService");
class GpsTrackingController {
    auditService = new auditService_1.AuditService();
    gpsTrackingService = new gpsTrackingService_1.GpsTrackingService();
    formId = 'rastreiogps';
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.gpsTrackingService.getAll(requesterId);
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
            const options = await this.gpsTrackingService.getFormOptions();
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
            const result = await this.gpsTrackingService.create(data, requesterId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar um registro de rastreio GPS para um animal que já possui um registro.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "gpsTracking", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const data = req.body;
            const result = await this.gpsTrackingService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Registro de rastreio GPS não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar um registro de rastreio GPS para um animal que já possui um registro.')
                return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "gpsTracking", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.gpsTrackingService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Registro de rastreio GPS não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.GpsTrackingController = GpsTrackingController;
//# sourceMappingURL=gpsTrackingController.js.map