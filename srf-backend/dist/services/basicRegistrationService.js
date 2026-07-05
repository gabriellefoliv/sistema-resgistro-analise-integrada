"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRegistrationService = exports.deadAnimalTypes = exports.liveAnimalTypes = void 0;
const __1 = require("..");
const auditService_1 = require("./auditService");
// Tipos compartilhados (Animais Vivos e Animais Mortos)
const sharedTypes = [
    { label: 'Espécie', prismaModel: 'specie', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Gênero de Ectoparasito', prismaModel: 'ectoparasiteGenus', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Espécie de Ectoparasito', prismaModel: 'ectoparasiteSpecie', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Armazém', prismaModel: 'storage', valueField: 'name', valueFieldLabel: 'Nome' }
];
// Tipos exclusivos de Animais Vivos
const liveAnimalOnlyTypes = [
    { label: 'Veterinário', prismaModel: 'veterinarian', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tipo da Vacina', prismaModel: 'vaccine', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tipo de Aplicação da Vacina', prismaModel: 'enumVaccineType', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Estado Geral do Exame', prismaModel: 'enumExamGeneralCondition', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Interpretação do Exame', prismaModel: 'enumExamInterpretation', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Interpretação do Valor do Exame', prismaModel: 'enumExamValueInterpretation', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tipo de Exame', prismaModel: 'examType', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tecnologia de Processamento', prismaModel: 'processingTechnology', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Espécie de Ovo/Cisto', prismaModel: 'eggCystSpecie', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Estado Geral do Exame Físico', prismaModel: 'enumPhysicalExamGeneralCondition', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Mucosa', prismaModel: 'enumMucous', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Hidratação', prismaModel: 'enumHydration', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tipo de Resultado Sorológico', prismaModel: 'enumSorologyResultType', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Interpretação Sorológica', prismaModel: 'enumSorologyInterpretation', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Teste Sorológico', prismaModel: 'sorologyTest', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Agente Sorológico', prismaModel: 'sorologyAgent', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Status da Amostra Veterinária', prismaModel: 'enumVeterinarianSampleAllocationStatus', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Dispositivo de Rastreio', prismaModel: 'trackingDevice', valueField: 'brand', valueFieldLabel: 'Marca', secondaryField: 'serialNumber', secondaryFieldLabel: 'Número de Série' },
    { label: 'Tipo de Amostra Veterinária', prismaModel: 'veterinarianSampleType', valueField: 'description', valueFieldLabel: 'Descrição' },
    { label: 'Método de Monitoramento', prismaModel: 'monitoringMethod', valueField: 'description', valueFieldLabel: 'Descrição' },
    { label: 'Medida Corporal (Veterinário)', prismaModel: 'bodyMeasurementTypeVeterinarian', valueField: 'description', valueFieldLabel: 'Descrição', secondaryField: 'unit', secondaryFieldLabel: 'Unidade' }
];
// Tipos exclusivos de Animais Mortos
const deadAnimalOnlyTypes = [
    { label: 'Grupo do Animal Morto', prismaModel: 'deadAnimalGroup', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Origem do Animal Morto', prismaModel: 'enumDeadAnimalOrigin', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Status do Animal Morto', prismaModel: 'enumDeadAnimalStatus', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Responsável da Coleta', prismaModel: 'collectionResponsible', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Estado Corporal', prismaModel: 'enumBodyCondition', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Estado Clínico', prismaModel: 'enumClinicalCondition', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Condição Reprodutiva', prismaModel: 'enumReproductiveCondition', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Faixa Etária', prismaModel: 'enumAge', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Espécie de Helminto', prismaModel: 'helminthSpecie', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Status da Amostra de Necrópsia', prismaModel: 'enumNecropsySampleAllocationStatus', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Tipo da Amostra de Necrópsia', prismaModel: 'necropsySampleType', valueField: 'description', valueFieldLabel: 'Descrição' },
    { label: 'Medida Corporal (Necrópsia)', prismaModel: 'bodyMeasurementTypeNecropsy', valueField: 'description', valueFieldLabel: 'Descrição', secondaryField: 'unit', secondaryFieldLabel: 'Unidade' },
    { label: 'Tipo de Amostra CPCR', prismaModel: 'cpcrSampleType', valueField: 'description', valueFieldLabel: 'Descrição' },
    { label: 'Tipo de Amostra QPCR', prismaModel: 'qpcrSampleType', valueField: 'description', valueFieldLabel: 'Descrição' },
    { label: 'Tipo de Extração', prismaModel: 'extractionType', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Gene Alvo', prismaModel: 'targetGene', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Agente Suspeito', prismaModel: 'suspiciousAgent', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Método de CPCR', prismaModel: 'enumCpcrMethod', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Status de CPCR', prismaModel: 'enumCpcrStatus', valueField: 'name', valueFieldLabel: 'Nome' },
    { label: 'Status de QPCR', prismaModel: 'enumQpcrStatus', valueField: 'name', valueFieldLabel: 'Nome' }
];
exports.liveAnimalTypes = [...sharedTypes, ...liveAnimalOnlyTypes];
exports.deadAnimalTypes = [...sharedTypes, ...deadAnimalOnlyTypes];
class BasicRegistrationService {
    auditService = new auditService_1.AuditService();
    findTypeConfig(types, typeLabel) {
        const config = types.find(t => t.label === typeLabel);
        if (!config)
            throw new Error(`Tipo "${typeLabel}" não encontrado.`);
        return config;
    }
    async getAll(requesterId, types, formId) {
        // Verificar permissões do usuário uma única vez
        const user = await __1.prisma.user.findUnique({
            where: { id: requesterId },
            select: { role: { select: { name: true } } }
        });
        const isAdminOrOwner = user?.role.name === 'admin' || user?.role.name === 'owner';
        let canEditAll = isAdminOrOwner;
        let canEditOwn = false;
        if (!isAdminOrOwner) {
            const userAccess = await __1.prisma.userAccess.findFirst({
                where: { userId: requesterId, formId }
            });
            if (userAccess?.accessLevelId) {
                const levels = await __1.prisma.enumAccessLevel.findMany({ select: { id: true, value: true } });
                const userLevel = levels.find(l => l.id === userAccess.accessLevelId);
                const editUnrestrictedLevel = levels.find(l => l.id === 'edit_unrestricted');
                const editLevel = levels.find(l => l.id === 'edit');
                if (editUnrestrictedLevel && userLevel && userLevel.value >= editUnrestrictedLevel.value) {
                    canEditAll = true;
                }
                else if (editLevel && userLevel && userLevel.value >= editLevel.value) {
                    canEditOwn = true;
                }
            }
        }
        // Buscar registros de todas as tabelas em paralelo
        const allResults = await Promise.all(types.map(async (typeConfig) => {
            const model = __1.prisma[typeConfig.prismaModel];
            const records = await model.findMany({
                orderBy: { [typeConfig.valueField]: 'asc' }
            });
            return records.map((record) => ({
                id: record.id,
                type: typeConfig.label,
                value: String(record[typeConfig.valueField]),
                secundaryValue: typeConfig.secondaryField ? String(record[typeConfig.secondaryField] ?? '') : undefined,
                _prismaModel: typeConfig.prismaModel,
            }));
        }));
        const flatResults = allResults.flat();
        // Buscar changelogs de criação para determinar createdByMe
        if (canEditOwn || !canEditAll) {
            const createLogs = await __1.prisma.changeLog.findMany({
                where: {
                    action: 'CREATE',
                    table: { in: types.map(t => t.prismaModel) },
                },
                select: {
                    table: true,
                    recordId: true,
                    auditLog: { select: { userId: true } }
                }
            });
            const creatorMap = new Map();
            for (const log of createLogs) {
                creatorMap.set(`${log.table}:${log.recordId}`, log.auditLog.userId);
            }
            return flatResults.map(r => ({
                id: r.id,
                type: r.type,
                value: r.value,
                secundaryValue: r.secundaryValue,
                canEdit: canEditAll || (canEditOwn && creatorMap.get(`${r._prismaModel}:${r.id}`) === requesterId),
                createdByMe: creatorMap.get(`${r._prismaModel}:${r.id}`) === requesterId,
            }));
        }
        return flatResults.map(r => ({
            id: r.id,
            type: r.type,
            value: r.value,
            secundaryValue: r.secundaryValue,
            canEdit: canEditAll,
            createdByMe: false,
        })).sort((a, b) => a.type.localeCompare(b.type));
    }
    async getFormOptions(types) {
        return {
            types: types.map((t, index) => ({
                id: index + 1,
                name: t.label,
                valueFieldLabel: t.valueFieldLabel,
                hasSecondaryValue: !!t.secondaryField,
                secondaryValueLabel: t.secondaryFieldLabel,
            })).sort((a, b) => a.name.localeCompare(b.name)),
        };
    }
    async create(data, requesterId, types, formId) {
        const config = this.findTypeConfig(types, data.type);
        return __1.prisma.$transaction(async (tx) => {
            const model = tx[config.prismaModel];
            const createData = { [config.valueField]: data.value };
            if (config.secondaryField && data.secundaryValue) {
                createData[config.secondaryField] = data.secundaryValue;
            }
            const record = await model.create({ data: createData });
            const changes = [{
                    table: config.prismaModel,
                    recordId: String(record.id),
                    action: 'CREATE',
                    newData: record,
                }];
            await this.auditService.logTransaction(requesterId, formId, 'SUBMIT', changes);
            return record;
        });
    }
    async update(recordId, data, requesterId, types, formId) {
        const config = this.findTypeConfig(types, data.type);
        return __1.prisma.$transaction(async (tx) => {
            const model = tx[config.prismaModel];
            const existing = await model.findUnique({ where: { id: recordId } });
            if (!existing)
                throw new Error('Registro não encontrado.');
            const updateData = { [config.valueField]: data.value };
            if (config.secondaryField) {
                updateData[config.secondaryField] = data.secundaryValue ?? null;
            }
            const updated = await model.update({
                where: { id: recordId },
                data: updateData,
            });
            const changes = [{
                    table: config.prismaModel,
                    recordId: String(updated.id),
                    action: 'UPDATE',
                    newData: updated,
                    oldData: existing,
                }];
            await this.auditService.logTransaction(requesterId, formId, 'SUBMIT', changes);
            return updated;
        });
    }
    async delete(recordId, typeLabel, requesterId, types, formId) {
        const config = this.findTypeConfig(types, typeLabel);
        return __1.prisma.$transaction(async (tx) => {
            const model = tx[config.prismaModel];
            const existing = await model.findUnique({ where: { id: recordId } });
            if (!existing)
                throw new Error('Registro não encontrado.');
            await model.delete({ where: { id: recordId } });
            const changes = [{
                    table: config.prismaModel,
                    recordId: String(existing.id),
                    action: 'DELETE',
                    oldData: existing,
                }];
            await this.auditService.logTransaction(requesterId, formId, 'SUBMIT', changes);
            return { message: 'Registro deletado com sucesso.' };
        });
    }
}
exports.BasicRegistrationService = BasicRegistrationService;
//# sourceMappingURL=basicRegistrationService.js.map