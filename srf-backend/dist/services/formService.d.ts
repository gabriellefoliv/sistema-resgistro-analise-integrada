declare class FormService {
    getNavigationOptions(): Promise<{
        subCategory: {
            name: string | undefined;
            id: string;
        }[];
        name: string;
        id: string;
        categoryIcon: string | null;
    }[]>;
    getForms(): Promise<{
        category: string;
        forms: {
            name: string;
            id: string;
        }[];
    }[]>;
    getAccessLevel(): Promise<{
        name: string;
        id: string;
        value: number;
    }[]>;
}
export { FormService };
//# sourceMappingURL=formService.d.ts.map