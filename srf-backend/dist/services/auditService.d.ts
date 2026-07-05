type ChangeDetail = {
    table: string;
    recordId: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    oldData?: any;
    newData?: any;
};
declare class AuditService {
    logTransaction(userId: string, formId: string, actionType: string, changes: ChangeDetail[]): Promise<{
        id: string;
        date: Date;
        userId: string;
        formId: string;
        action: string;
    }>;
    findRecordCreatorId(table: string, recordId: string): Promise<string | null>;
    canUserEditRecord(userId: string, table: string, recordId: string, formId: string): Promise<{
        canEdit: boolean;
        reason: string;
    }>;
    canUserCreateRecord(userId: string, formId: string): Promise<{
        canCreate: boolean;
        reason: string;
    }>;
}
export { AuditService };
//# sourceMappingURL=auditService.d.ts.map