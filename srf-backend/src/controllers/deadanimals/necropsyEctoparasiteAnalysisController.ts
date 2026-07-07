import { Request, Response } from "express";
import { ZodError } from "zod";
import { NecropsyEctoparasiteAnalysisService } from "../../services/deadanimals/necropsyEctoparasiteAnalysisService";
import { AuditService } from "../../services/auditService";
import {
    type CreateNecropsyEctoparasiteAnalysisInput,
    type UpdateNecropsyEctoparasiteAnalysisInput
} from "srf-shared-types";

export class NecropsyEctoparasiteAnalysisController {
    private auditService = new AuditService();
    private necropsyEctoparasiteAnalysisService = new NecropsyEctoparasiteAnalysisService();
    private formId = 'analiseectoparasitos-av';
    private tableName = 'ectoparasiteAnalysisNecropsy';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.necropsyEctoparasiteAnalysisService.getAll(requesterId);
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
            const options = await this.necropsyEctoparasiteAnalysisService.getFormOptions();
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

            const data = req.body as CreateNecropsyEctoparasiteAnalysisInput;

            const result = await this.necropsyEctoparasiteAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel criar uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).') return res.status(409).json({ error: error.message });
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

            const data = req.body as UpdateNecropsyEctoparasiteAnalysisInput;

            const result = await this.necropsyEctoparasiteAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possivel atualizar para uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).') return res.status(409).json({ error: error.message });
            if (error.message === 'Análise de ectoparasito não encontrada.') return res.status(404).json({ error: error.message });
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

            const result = await this.necropsyEctoparasiteAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de ectoparasito não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}
