import { Request, Response } from "express";
import { ZodError } from "zod";
import { NecropsyExamResultService } from "../../services/deadanimals/necropsyExamResultService";
import { AuditService } from "../../services/auditService";
import {
    type CreateCPCRResultInput,
    type UpdateCPCRResultInput,
    type CreateQPCRResultInput,
    type UpdateQPCRResultInput
} from "srf-shared-types";

export class NecropsyExamResultController {
    private auditService = new AuditService();
    private service = new NecropsyExamResultService();
    private formId = 'resultadoexame-am';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.service.getAll(requesterId);
            return res.status(200).json(results);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    // CPCR

    getCPCRFormOptions = async (req: Request, res: Response) => {
        try {
            const options = await this.service.getCPCRFormOptions();
            return res.status(200).json(options);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    createCPCR = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as CreateCPCRResultInput;
            const result = await this.service.createCPCR(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado CPCR para esta necrópsia e tipo de amostra.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    updateCPCR = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'cpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateCPCRResultInput;
            const result = await this.service.updateCPCR(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado CPCR não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado CPCR para esta necrópsia e tipo de amostra.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    deleteCPCR = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'cpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.service.deleteCPCR(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado CPCR não encontrado.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    // QPCR

    getQPCRFormOptions = async (req: Request, res: Response) => {
        try {
            const options = await this.service.getQPCRFormOptions();
            return res.status(200).json(options);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    createQPCR = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as CreateQPCRResultInput;
            const result = await this.service.createQPCR(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado QPCR para esta necrópsia e tipo de amostra.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    updateQPCR = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'qpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateQPCRResultInput;
            const result = await this.service.updateQPCR(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado QPCR não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe um resultado QPCR para esta necrópsia e tipo de amostra.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    deleteQPCR = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, 'qpcrResult', recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.service.deleteQPCR(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) return res.status(400).json({ message: error.flatten().fieldErrors });
            if (error.message === 'Resultado QPCR não encontrado.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}
