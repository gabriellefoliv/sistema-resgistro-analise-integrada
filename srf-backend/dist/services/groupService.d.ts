export declare class GroupService {
    getAllGroups(): Promise<{
        id: string;
        name: string;
        groupAccess: {
            formId: string;
            accessLevelId: string | null;
        }[];
    }[]>;
}
//# sourceMappingURL=groupService.d.ts.map