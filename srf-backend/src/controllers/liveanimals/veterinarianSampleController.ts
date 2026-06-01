import { Request, Response } from "express";
import { ZodError } from "zod";
import { VeterinarianSampleService } from "../../services/liveanimals/veterinarianSampleService";
import { AuditService } from "../../services/auditService";
import {
    type CreateVeterinarianSampleInput,
    type UpdateVeterinarianSampleInput
} from "srf-shared-types";

export class VeterinarianSampleController {
    private auditService = new AuditService();
    private veterinarianSampleService = new VeterinarianSampleService();
    private formId = 'amostras-av' as const;

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const samples = await this.veterinarianSampleService.getAll(requesterId);
            return res.status(200).json(samples);
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
            const options = await this.veterinarianSampleService.getFormOptions();
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

            const data = req.body as CreateVeterinarianSampleInput;

            const result = await this.veterinarianSampleService.create(data, requesterId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Storage não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem visita veteriária e tipo.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.') return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da visita veterinária.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "sampleAllocationVeterinarian", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateVeterinarianSampleInput;

            const result = await this.veterinarianSampleService.update(Number(recordId), data, requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Visita veterinária não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Storage não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não foi possível atualizar a amostra veterinária, pois já existe uma amostra que compartilha a mesma visita veterinária e tipo de amostra.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.') return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da visita veterinária.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, "sampleAllocationVeterinarian", recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.veterinarianSampleService.delete(Number(recordId), requesterId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra veterinária não encontrada.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}