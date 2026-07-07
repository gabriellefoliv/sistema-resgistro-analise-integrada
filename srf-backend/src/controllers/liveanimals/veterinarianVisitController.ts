import { Request, Response } from "express";
import { VeterinarianVisitService } from "../../services/liveanimals/veterinarianVisitService";
import { AuditService } from "../../services/auditService";
import { veterinarianVisitCreateInput, veterinarianVisitUpdateInput } from "../../models/veterinarianVisitModel";

class VeterinarianVisitController {
    private auditService = new AuditService();
    private veterinarianVisitService = new VeterinarianVisitService();

    getAll = async (req: Request, res: Response) => {
        try {
            const visits = await this.veterinarianVisitService.getAll(req.userId);
            return res.status(200).json(visits);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    getFormOptions = async (req: Request, res: Response) => {
        try {
            const options = await this.veterinarianVisitService.getFormOptions();
            return res.status(200).json(options);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const permissionCheck = await this.auditService.canUserCreateRecord(req.userId, 'visitaveterinaria');
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements } = veterinarianVisitCreateInput.parse(req.body);

            const visit = await this.veterinarianVisitService.create(
                { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements },
                req.userId
            );
            return res.status(201).json(visit);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Não é possível criar uma visita veterinária com a mesma data e veterinário para o mesmo animal.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível criar uma visita veterinária com o tipo de medida corporal duplicado.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            // sem verificação de permissão
            const { id } = req.params;
            const { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements } = veterinarianVisitUpdateInput.parse(req.body);

            const visit = await this.veterinarianVisitService.update(
                Number(id),
                { liveAnimalId, veterinarianId, date, animalPicture, note, bodyMeasurements },
                req.userId
            );
            return res.status(200).json(visit);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Não é possível alterar uma visita veterinária para a mesma data e veterinário para o mesmo animal.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível alterar uma visita veterinária com o tipo de medida corporal duplicado.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.veterinarianVisitService.delete(Number(id), req.userId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Visita veterinária não encontrada') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível excluir a visita pois existem amostras vinculadas a ela. Remova as amostras antes de excluir a visita.') return res.status(400).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}

export { VeterinarianVisitController };
