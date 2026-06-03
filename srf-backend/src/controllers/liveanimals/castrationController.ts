import { Request, Response } from "express";
import { ZodError } from "zod";
import { CastrationService } from "../../services/liveanimals/castrationService";
import { AuditService } from "../../services/auditService";
import {
    type CreateCastrationInput,
    type UpdateCastrationInput
} from "srf-shared-types";

export class CastrationController {
    private auditService = new AuditService();
    private castrationService = new CastrationService();
    private formId = 'castracao' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const castrations = await this.castrationService.getAll(requesterId);
            return res.status(200).json(castrations);
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
            const options = await this.castrationService.getFormOptions();
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

            const data = req.body as CreateCastrationInput;

            const result = await this.castrationService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Este animal já possui uma castração registrada.') return res.status(400).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Esta visita veterinária já possui uma castração associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser a mesma da data da visita veterinária associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser maior que a data de nascimento do animal.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "castration", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateCastrationInput;

            const result = await this.castrationService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Castração não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Este animal já possui uma castração registrada.') return res.status(400).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Esta visita veterinária já possui uma castração associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser a mesma da data da visita veterinária associada.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da castração deve ser maior que a data de nascimento do animal.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "castration", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.castrationService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Castração não encontrada.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}
