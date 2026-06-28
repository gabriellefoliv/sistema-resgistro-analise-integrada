import { Request, Response } from "express";
import { ZodError } from "zod";
import { BasicRegistrationService, liveAnimalTypes, deadAnimalTypes, type TypeConfig } from "../services/basicRegistrationService";
import { AuditService } from "../services/auditService";
import {
    type CreateBasicRegistrationInput,
    type UpdateBasicRegistrationInput
} from "srf-shared-types";

export class BasicRegistrationController {
    private auditService = new AuditService();
    private service = new BasicRegistrationService();
    private formId: string;
    private types: TypeConfig[];

    constructor(formId: string, types: TypeConfig[]) {
        this.formId = formId;
        this.types = types;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.service.getAll(requesterId, this.types, this.formId);
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
            const options = await this.service.getFormOptions(this.types);
            return res.status(200).json(options);
        } catch (error: any) {
            console.error(error);
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

            const data = req.body as CreateBasicRegistrationInput;
            const result = await this.service.create(data, requesterId, this.types, this.formId);
            return res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message?.includes('não encontrado')) return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const data = req.body as UpdateBasicRegistrationInput;

            // Encontrar o tipo para determinar a tabela
            const config = this.types.find(t => t.label === data.type);
            if (!config) return res.status(400).json({ error: `Tipo "${data.type}" não encontrado.` });

            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, config.prismaModel, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.service.update(Number(recordId), data, requesterId, this.types, this.formId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Registro não encontrado.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const typeLabel = req.query.type as string;

            if (!typeLabel) return res.status(400).json({ error: 'O parâmetro "type" é obrigatório.' });

            const config = this.types.find(t => t.label === typeLabel);
            if (!config) return res.status(400).json({ error: `Tipo "${typeLabel}" não encontrado.` });

            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, config.prismaModel, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.service.delete(Number(recordId), typeLabel, requesterId, this.types, this.formId);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Registro não encontrado.') return res.status(404).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    }
}

// Instâncias para cada formulário
export const liveAnimalRegistrationController = new BasicRegistrationController('cadastrobasico-av', liveAnimalTypes);
export const deadAnimalRegistrationController = new BasicRegistrationController('cadastrobasico-am', deadAnimalTypes);
