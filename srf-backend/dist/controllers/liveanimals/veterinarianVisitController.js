"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeterinarianVisitController = void 0;
const veterinarianVisitService_1 = require("../../services/liveanimals/veterinarianVisitService");
const auditService_1 = require("../../services/auditService");
const veterinarianVisitModel_1 = require("../../models/veterinarianVisitModel");
class VeterinarianVisitController {
    auditService = new auditService_1.AuditService();
    veterinarianVisitService = new veterinarianVisitService_1.VeterinarianVisitService();
    getAll = async (req, res) => {
        try {
            const visits = await this.veterinarianVisitService.getAll(req.userId);
            return res.status(200).json(visits);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };
    getFormOptions = async (req, res) => {
        try {
            const options = await this.veterinarianVisitService.getFormOptions();
            return res.status(200).json(options);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };
    create = async (req, res) => {
        try {
            const permissionCheck = await this.auditService.canUserCreateRecord(req.userId, 'visitaveterinaria');
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }
            const { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements } = veterinarianVisitModel_1.veterinarianVisitCreateInput.parse(req.body);
            const visit = await this.veterinarianVisitService.create({ liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements }, req.userId);
            return res.status(201).json(visit);
        }
        catch (error) {
            console.error(error);
            if (error.message === 'Não é possível criar uma visita veterinária com a mesma data e veterinário para o mesmo animal.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível criar uma visita veterinária com o tipo de medida corporal duplicado.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            // sem verificação de permissão
            const { id } = req.params;
            const { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements } = veterinarianVisitModel_1.veterinarianVisitUpdateInput.parse(req.body);
            const visit = await this.veterinarianVisitService.update(Number(id), { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements }, req.userId);
            return res.status(200).json(visit);
        }
        catch (error) {
            console.error(error);
            if (error.message === 'Não é possível alterar uma visita veterinária para a mesma data e veterinário para o mesmo animal.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível alterar uma visita veterinária com o tipo de medida corporal duplicado.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.veterinarianVisitService.delete(Number(id), req.userId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            if (error.message === 'Visita veterinária não encontrada')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível excluir a visita pois existem amostras vinculadas a ela. Remova as amostras antes de excluir a visita.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.VeterinarianVisitController = VeterinarianVisitController;
//# sourceMappingURL=veterinarianVisitController.js.map