import { Request, Response } from "express";
import { ZodError } from "zod";
import { VaccineService } from "../../services/liveanimals/vaccineService";
import { AuditService } from "../../services/auditService";
import {
    type CreateVaccineInput,
    type UpdateVaccineInput
} from "srf-shared-types";

export class VaccineController {
    private auditService = new AuditService();
    private vaccineService = new VaccineService();
    private formId = 'vacina' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const vaccines = await this.vaccineService.getAll(requesterId);
            return res.status(200).json(vaccines);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    getFormOptions = async (req: Request, res: Response) => {
        try {
            const options = await this.vaccineService.getFormOptions();
            return res.status(200).json(options);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as CreateVaccineInput;

            const result = await this.vaccineService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Vacina não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de aplicação da vacina não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'Esta vacina já foi aplicada neste animal nesta data.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "vaccineApplication", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateVaccineInput;

            const result = await this.vaccineService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Aplicação da vacina não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Vacina não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de aplicação da vacina não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'Aplicação da vacina já existe.') return res.status(400).json({ error: error.message });
            if (error.message === 'Esta vacina já foi aplicada neste animal nesta data.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "vaccineApplication", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.vaccineService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Aplicação da vacina não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}