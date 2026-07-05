"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditController = void 0;
const auditService_1 = require("../services/auditService");
class AuditController {
    // For testing purposes - in a real app this would be internal or triggered by business logic
    async createLog(req, res) {
        try {
            const { userId, formId, actionType, changes } = req.body;
            if (!userId || !formId || !actionType || !changes) {
                return res.status(400).json({ error: "Campos obrigatórios não informados" });
            }
            const log = await new auditService_1.AuditService().logTransaction(userId, formId, actionType, changes);
            return res.status(201).json(log);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
    async checkEditPermission(req, res) {
        try {
            const { table, recordId, formId } = req.query;
            const userId = req.userId;
            if (!table || !recordId || !formId) {
                return res.status(400).json({ error: "table, recordId e formId são obrigatórios" });
            }
            const result = await new auditService_1.AuditService().canUserEditRecord(userId, String(table), String(recordId), String(formId));
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.AuditController = AuditController;
//# sourceMappingURL=auditController.js.map