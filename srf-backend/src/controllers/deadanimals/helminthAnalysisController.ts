import { Request, Response } from "express";
import { ZodError } from "zod";
import { HelminthAnalysisService } from "../../services/deadanimals/helmithAnalysisService";
import { AuditService } from "../../services/auditService";
import {
    type CreateHelminthAnalysisInput,
    type UpdateHelminthAnalysisInput
} from "srf-shared-types";

export class HelminthAnalysisController {
    private auditService = new AuditService();
    private helminthAnalysisService = new HelminthAnalysisService();
    private formId = 'analisehelmintos';
    private tableName = 'helminthAnalysis';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.helminthAnalysisService.getAll(requesterId);
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
            const options = await this.helminthAnalysisService.getFormOptions();
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

            const data = req.body as CreateHelminthAnalysisInput;

            const result = await this.helminthAnalysisService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necropsia não encontrada.' || error.message === 'Espécie de helminto não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma análise de helminto para esta necropsia e espécie de helminto.') return res.status(409).json({ error: error.message });
            if (error.message === 'A soma de machos e fêmeas deve ser igual ou inferior ao total.') return res.status(400).json({ error: error.message });
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

            const data = req.body as UpdateHelminthAnalysisInput;

            const result = await this.helminthAnalysisService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de helminto não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Necropsia não encontrada.' || error.message === 'Espécie de helminto não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma análise de helminto para esta necropsia e espécie de helminto.') return res.status(409).json({ error: error.message });
            if (error.message === 'A soma de machos e fêmeas deve ser igual ou inferior ao total.') return res.status(400).json({ error: error.message });
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

            const result = await this.helminthAnalysisService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Análise de helminto não encontrada.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}