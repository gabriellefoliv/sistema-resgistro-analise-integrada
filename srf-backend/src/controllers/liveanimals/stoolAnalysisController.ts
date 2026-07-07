import { Request, Response } from "express";
import { ZodError } from "zod";
import { StoolAnalysisService } from "../../services/liveanimals/stoolAnalysisService";
import { AuditService } from "../../services/auditService";
import {
    type CreateStoolAnalysisInput,
    type UpdateStoolAnalysisInput
} from "srf-shared-types";

export class StoolAnalysisController {
    private auditService = new AuditService();
    private stoolAnalysisService = new StoolAnalysisService();
    private formId = 'analisefezes' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.stoolAnalysisService.getAll(requesterId);
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
            const options = await this.stoolAnalysisService.getFormOptions();
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

            const data = req.body as CreateStoolAnalysisInput;

            const result = await this.stoolAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "stoolAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateStoolAnalysisInput;

            const result = await this.stoolAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de fezes não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "stoolAnalysis", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.stoolAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de fezes não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Não é possível excluir')) return res.status(409).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}
