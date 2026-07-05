"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class TutorService {
    auditService = new auditService_1.AuditService();
    formId = 'tutor';
    tableName = 'tutor';
    async getAll(requesterId) {
        const tutors = await __1.prisma.tutor.findMany({
            select: {
                id: true,
                name: true,
                genderId: true,
                gender: { select: { id: true, name: true } },
                birthDate: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        const tutorsIds = tutors.map(t => t.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: this.tableName,
                recordId: { in: tutorsIds.map(String) },
                action: 'CREATE'
            },
            select: {
                recordId: true,
                auditLog: { select: { userId: true } }
            }
        });
        const creatorMap = new Map();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }
        const tutorsWithPermission = await Promise.all(tutors.map(async (t) => {
            const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(t.id), this.formId);
            return {
                id: t.id,
                name: t.name,
                genderId: t.genderId,
                genderName: t.gender.name,
                birthDate: t.birthDate.toISOString(),
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(t.id)) === requesterId
            };
        }));
        return tutorsWithPermission;
    }
    async getFormOptions() {
        const genders = await __1.prisma.enumGender.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });
        return { genders };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const tutor = await tx.tutor.create({
                data: {
                    name: data.name,
                    genderId: data.genderId,
                    birthDate: new Date(data.birthDate + 'T12:00:00Z')
                }
            });
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(tutor.id),
                    action: 'CREATE',
                    newData: tutor
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return tutor;
        });
    }
    async update(recordId, data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const existingTutor = await tx.tutor.findUnique({
                where: { id: recordId }
            });
            if (!existingTutor)
                throw new Error('Tutor não encontrado.');
            const updatedTutor = await tx.tutor.update({
                where: { id: recordId },
                data: {
                    name: data.name,
                    genderId: data.genderId,
                    birthDate: new Date(data.birthDate + 'T12:00:00Z')
                }
            });
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(updatedTutor.id),
                    action: 'UPDATE',
                    newData: updatedTutor,
                    oldData: existingTutor
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return updatedTutor;
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const existingTutor = await tx.tutor.findUnique({
                where: { id: recordId }
            });
            if (!existingTutor)
                throw new Error('Tutor não encontrado.');
            const hasChildRecords = await tx.tutorInterview.count({
                where: { tutorId: recordId },
            }) > 0 ||
                await tx.necropsy.count({
                    where: { tutorId: recordId },
                }) > 0;
            if (hasChildRecords) {
                throw new Error('Este tutor possui registros associados e não pode ser deletado. Remova os registros associados antes de deletar o tutor.');
            }
            await tx.tutor.delete({
                where: { id: recordId }
            });
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(existingTutor.id),
                    action: 'DELETE',
                    oldData: existingTutor
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Tutor deletado com sucesso.' };
        });
    }
}
exports.TutorService = TutorService;
//# sourceMappingURL=tutorService.js.map