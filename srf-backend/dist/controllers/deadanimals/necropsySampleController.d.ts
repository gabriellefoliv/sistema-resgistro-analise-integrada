import { type Request, type Response } from 'express';
export declare class NecropsySampleController {
    private auditService;
    private necropsySampleService;
    private formId;
    private tableName;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=necropsySampleController.d.ts.map