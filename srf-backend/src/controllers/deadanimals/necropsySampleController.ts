import { type Request, type Response } from 'express';
import { ZodError } from "zod";
import { NecropsySampleService } from '../../services/deadanimals/necropsySampleService';
import { AuditService } from '../../services/auditService';
import { CreateNecropsySampleInput, UpdateNecropsySampleInput } from 'srf-shared-types';

export class NecropsySampleController {
    private auditService = new AuditService();
    private necropsySampleService = new NecropsySampleService();
    private formId = 'amostras-am';
    private tableName = 'sampleAllocationNecropsy';

    getAll = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const results = await this.necropsySampleService.getAll(requesterId);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: 'Erro ao buscar amostras de necrópsia.' });
        }
    };

    getFormOptions = async (req: Request, res: Response) => {
        try {
            const options = await this.necropsySampleService.getFormOptions();
            return res.status(200).json(options);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            return res.status(500).json({ error: 'Erro ao buscar opções do formulário.' });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserCreateRecord(requesterId, this.formId);
            if (!permissionCheck.canCreate) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as CreateNecropsySampleInput;
            const result = await this.necropsySampleService.create(data, requesterId);
            res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Armazenamento não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem necrópsia e tipo.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da necrópsia.') return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.') return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: error.message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const data = req.body as UpdateNecropsySampleInput;
            const result = await this.necropsySampleService.update(Number(recordId), data, requesterId);
            res.status(201).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra de necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Tipo de amostra não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message === 'Status não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Armazenamento não encontrado.') return res.status(404).json({ error: error.message });
            if (error.message === 'Não é possível criar amostras que compartilhem necrópsia e tipo.') return res.status(400).json({ error: error.message });
            if (error.message === 'Não é possível enviar a mesma amostra para o mesmo local.') return res.status(400).json({ error: error.message });
            if (error.message === 'A data de envio da amostra não pode ser anterior à data da necrópsia.') return res.status(400).json({ error: error.message });
            if (error.message === 'A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.') return res.status(400).json({ error: error.message });
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const recordId = req.params.recordId as string;
            const requesterId = req.userId as string;
            const permissionCheck = await this.auditService.canUserEditRecord(requesterId, this.tableName, recordId, this.formId);
            if (!permissionCheck.canEdit) {
                return res.status(403).json({ error: permissionCheck.reason });
            }

            const result = await this.necropsySampleService.delete(Number(recordId), requesterId);
            res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Amostra de necrópsia não encontrada.') return res.status(404).json({ error: error.message });
            if (error.message.includes('Foreign key constraint violated')) return res.status(400).json({ error: 'Não é possível excluir pois existem outros registros vinculados. Remova os registros antes de excluir.' });
            return res.status(500).json({ error: error.message });
        }
    };
}
