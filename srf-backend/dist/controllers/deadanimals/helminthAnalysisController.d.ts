import { Request, Response } from "express";
export declare class HelminthAnalysisController {
    private auditService;
    private helminthAnalysisService;
    private formId;
    private tableName;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=helminthAnalysisController.d.ts.map