import { Request, Response } from "express";
import { ZodError } from "zod";
import { NecropsyService } from "../../services/deadanimals/necropsyService";
import { AuditService } from "../../services/auditService";
import {
    type CreateNecropsyInput,
    type UpdateNecropsyInput
} from "srf-shared-types";

export class NecropsyController {
    private auditService = new AuditService();
    private necropsyService = new NecropsyService();
    private formId = 'necropsia' as const;
    private tableName = 'necropsy';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.necropsyService.getAll(requesterId);
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
            const options = await this.necropsyService.getFormOptions();
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

            const data = req.body as CreateNecropsyInput;

            const result = await this.necropsyService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Já existe uma necrópsia para este animal.') return res.status(409).json({ error: error.message });
            if (error.message === 'Não é possível criar uma necrópsia com o tipo de medida corporal duplicado.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da necrópsia não pode ser anterior à data da coleta do animal.') return res.status(400).json({ error: error.message });
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

            const data = req.body as UpdateNecropsyInput;

            const result = await this.necropsyService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma necrópsia para este animal.') return res.status(409).json({ error: error.message });
            if (error.message === 'Não é possível alterar uma necrópsia com o tipo de medida corporal duplicado.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data da necrópsia não pode ser anterior à data da coleta do animal.') return res.status(400).json({ error: error.message });
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

            const result = await this.necropsyService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível excluir esta necrópsia pois existem registros associados vinculados a ela. Remova os registros associados antes de excluir a necrópsia.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}
