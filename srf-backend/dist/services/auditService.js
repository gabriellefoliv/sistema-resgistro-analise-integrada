"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const index_1 = require("../index");
class AuditService {
    async logTransaction(userId, formId, actionType, changes) {
        return index_1.prisma.$transaction(async (tx) => {
            const auditLog = await tx.auditLog.create({
                data: {
                    userId,
                    formId,
                    action: actionType,
                    changes: {
                        create: changes.map(change => ({
                            table: change.table,
                            recordId: change.recordId,
                            action: change.action,
                            oldData: change.oldData ?? undefined,
                            newData: change.newData ?? undefined,
                        }))
                    }
                }
            });
            return auditLog;
        });
    }
    async findRecordCreatorId(table, recordId) {
        const createLog = await index_1.prisma.changeLog.findFirst({
            where: {
                table: table,
                recordId: recordId,
                action: 'CREATE',
            },
            select: {
                auditLog: {
                    select: { userId: true }
                }
            }
        });
        return createLog?.auditLog.userId ?? null;
    }
    async canUserEditRecord(userId, table, recordId, formId) {
        // Check if user is admin/owner
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId },
            select: { role: { select: { name: true } } }
        });
        if (!user) {
            return { canEdit: false, reason: 'Usuário não encontrado' };
        }
        if (user.role.name === 'admin' || user.role.name === 'owner') {
            return { canEdit: true, reason: 'Usuário é administrador' };
        }
        // Get user's access level for this form
        const userAccess = await index_1.prisma.userAccess.findFirst({
            where: { userId, formId }
        });
        if (!userAccess || !userAccess.accessLevelId) {
            return { canEdit: false, reason: 'Sem acesso ao formulário' };
        }
        // Check access level
        const levels = await index_1.prisma.enumAccessLevel.findMany({
            select: { id: true, value: true }
        });
        const userLevel = levels.find(l => l.id === userAccess.accessLevelId);
        if (!userLevel) {
            return { canEdit: false, reason: 'Nível de acesso não encontrado' };
        }
        const editUnrestrictedLevel = levels.find(l => l.id === 'edit_unrestricted');
        const editLevel = levels.find(l => l.id === 'edit');
        // edit_unrestricted -> can edit any record
        if (editUnrestrictedLevel && userLevel.value >= editUnrestrictedLevel.value) {
            return { canEdit: true, reason: 'Edição irrestrita' };
        }
        // edit -> can only edit own records
        if (editLevel && userLevel.value >= editLevel.value) {
            const creatorId = await this.findRecordCreatorId(table, recordId);
            if (creatorId === userId) {
                return { canEdit: true, reason: 'Criador do registro' };
            }
            return { canEdit: false, reason: 'Somente o criador pode editar este registro' };
        }
        // read -> cannot edit
        return { canEdit: false, reason: 'Permissão insuficiente para edição' };
    }
    async canUserCreateRecord(userId, formId) {
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId },
            select: { role: { select: { name: true } } }
        });
        if (!user) {
            return { canCreate: false, reason: 'Usuário não encontrado' };
        }
        if (user.role.name === 'admin' || user.role.name === 'owner') {
            return { canCreate: true, reason: 'Usuário é administrador' };
        }
        const userAccess = await index_1.prisma.userAccess.findFirst({
            where: { userId, formId }
        });
        if (!userAccess || !userAccess.accessLevelId) {
            return { canCreate: false, reason: 'Sem acesso ao formulário' };
        }
        const levels = await index_1.prisma.enumAccessLevel.findMany({
            select: { id: true, value: true }
        });
        const userLevel = levels.find(l => l.id === userAccess.accessLevelId);
        const editLevel = levels.find(l => l.id === 'edit');
        if (!userLevel || !editLevel) {
            return { canCreate: false, reason: 'Nível de acesso não encontrado' };
        }
        if (userLevel.value >= editLevel.value) {
            return { canCreate: true, reason: 'Permissão suficiente para criação' };
        }
        return { canCreate: false, reason: 'Permissão insuficiente para criação' };
    }
}
exports.AuditService = AuditService;
//# sourceMappingURL=auditService.js.map