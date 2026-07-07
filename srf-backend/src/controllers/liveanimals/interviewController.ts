import { Request, Response } from "express";
import { ZodError } from "zod";
import { InterviewService } from "../../services/liveanimals/interviewService";
import { AuditService } from "../../services/auditService";
import {
    type CreateInterviewInput,
    type UpdateInterviewInput
} from "srf-shared-types";

export class InterviewController {
    private auditService = new AuditService();
    private interviewService = new InterviewService();
    private formId = 'entrevista' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.interviewService.getAll(requesterId);
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
            const options = await this.interviewService.getFormOptions();
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

            const data = req.body as CreateInterviewInput;

            const result = await this.interviewService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Já existe uma entrevista para este tutor.') return res.status(409).json({ error: error.message });
            if (error.message === 'Um ou mais animais não estão associados ao tutor.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "tutorInterview", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateInterviewInput;

            const result = await this.interviewService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Entrevista não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Já existe uma entrevista para este tutor.') return res.status(409).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "tutorInterview", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.interviewService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Entrevista não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}
