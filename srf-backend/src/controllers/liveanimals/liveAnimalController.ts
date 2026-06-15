import { Request, Response } from "express";
import { ZodError } from "zod";
import { LiveAnimalService } from "../../services/liveanimals/liveAnimalService";
import { AuditService } from "../../services/auditService";
import {
    type CreateLiveAnimalInput,
    type UpdateLiveAnimalInput
} from "srf-shared-types";

export class LiveAnimalController {
    private auditService = new AuditService();
    private liveAnimalService = new LiveAnimalService();
    private formId = 'animal-av' as const;
    private tableName = 'liveAnimal';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.liveAnimalService.getAll(requesterId);
            return res.status(200).json(results);
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
            const options = await this.liveAnimalService.getFormOptions();
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

            const data = req.body as CreateLiveAnimalInput;

            const result = await this.liveAnimalService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Este tutor já possui um animal com este nome.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateLiveAnimalInput;

            const result = await this.liveAnimalService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Este tutor já possui um animal com este nome.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.liveAnimalService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Animal não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Este animal possui registros associados e não pode ser deletado. Remova os registros associados antes de deletar o animal.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}