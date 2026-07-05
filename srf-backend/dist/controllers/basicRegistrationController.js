"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deadAnimalRegistrationController = exports.liveAnimalRegistrationController = exports.BasicRegistrationController = void 0;
const zod_1 = require("zod");
const basicRegistrationService_1 = require("../services/basicRegistrationService");
const auditService_1 = require("../services/auditService");
class BasicRegistrationController {
    auditService = new auditService_1.AuditService();
    service = new basicRegistrationService_1.BasicRegistrationService();
    formId;
    types;
    constructor(formId, types) {
        this.formId = formId;
        this.types = types;
    }
    getAll = async (req, res) => {
        try {
            const requesterId = req.userId;
            const results = await this.service.getAll(requesterId, this.types, this.formId);
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
            const options = await this.service.getFormOptions(this.types);
            return res.status(200).json(options);
        }
        catch (error) {
            console.error(error);
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
            const result = await this.service.create(data, requesterId, this.types, this.formId);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message?.includes('não encontrado'))
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const data = req.body;
            // Encontrar o tipo para determinar a tabela
            const config = this.types.find(t => t.label === data.type);
            if (!config)
                return res.status(400).json({ error: `Tipo "${data.type}" não encontrado.` });
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, config.prismaModel, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.service.update(Number(recordId), data, requesterId, this.types, this.formId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Registro não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const recordId = req.params.recordId;
            const requesterId = req.userId;
            const typeLabel = req.query.type;
            if (!typeLabel)
                return res.status(400).json({ error: 'O parâmetro "type" é obrigatório.' });
            const config = this.types.find(t => t.label === typeLabel);
            if (!config)
                return res.status(400).json({ error: `Tipo "${typeLabel}" não encontrado.` });
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, config.prismaModel, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const result = await this.service.delete(Number(recordId), typeLabel, requesterId, this.types, this.formId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error.message === 'Registro não encontrado.')
                return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.BasicRegistrationController = BasicRegistrationController;
// Instâncias para cada formulário
exports.liveAnimalRegistrationController = new BasicRegistrationController('cadastrobasico-av', basicRegistrationService_1.liveAnimalTypes);
exports.deadAnimalRegistrationController = new BasicRegistrationController('cadastrobasico-am', basicRegistrationService_1.deadAnimalTypes);
//# sourceMappingURL=basicRegistrationController.js.map