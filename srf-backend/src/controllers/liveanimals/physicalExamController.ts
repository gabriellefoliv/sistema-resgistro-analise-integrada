import { Request, Response } from "express";
import { ZodError } from "zod";
import { PhysicalExamService } from "../../services/liveanimals/physicalExamService";
import { AuditService } from "../../services/auditService";
import {
    type CreatePhysicalExamInput,
    type UpdatePhysicalExamInput
} from "srf-shared-types";

export class PhysicalExamController {
    private auditService = new AuditService();
    private physicalExamService = new PhysicalExamService();
    private formId = 'examefisico' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const exams = await this.physicalExamService.getAll(requesterId);
            return res.status(200).json(exams);
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
            const options = await this.physicalExamService.getFormOptions();
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

            const data = req.body as CreatePhysicalExamInput;

            const exam = await this.physicalExamService.create(data, requesterId);
            return res.status(201).json(exam);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Não é possível criar um exame físico para uma visita veterinária que já possui um exame físico.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "physicalExam", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdatePhysicalExamInput;

            const exam = await this.physicalExamService.update(Number(recordId), data, requesterId);
            return res.status(200).json(exam);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Exame físico não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível atualizar um exame físico para uma visita veterinária que já possui um exame físico.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "physicalExam", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.physicalExamService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Exame físico não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    }
}