import { type GetAllBasicRegistrationsOutput, type GetFormOptionsBasicRegistrationOutput, type CreateBasicRegistrationInput, type UpdateBasicRegistrationInput } from "srf-shared-types";
export interface TypeConfig {
    label: string;
    prismaModel: string;
    valueField: string;
    valueFieldLabel: string;
    secondaryField?: string;
    secondaryFieldLabel?: string;
}
export declare const liveAnimalTypes: TypeConfig[];
export declare const deadAnimalTypes: TypeConfig[];
export declare class BasicRegistrationService {
    private auditService;
    private findTypeConfig;
    getAll(requesterId: string, types: TypeConfig[], formId: string): Promise<GetAllBasicRegistrationsOutput[]>;
    getFormOptions(types: TypeConfig[]): Promise<GetFormOptionsBasicRegistrationOutput>;
    create(data: CreateBasicRegistrationInput, requesterId: string, types: TypeConfig[], formId: string): Promise<any>;
    update(recordId: number, data: UpdateBasicRegistrationInput, requesterId: string, types: TypeConfig[], formId: string): Promise<any>;
    delete(recordId: number, typeLabel: string, requesterId: string, types: TypeConfig[], formId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=basicRegistrationService.d.ts.map