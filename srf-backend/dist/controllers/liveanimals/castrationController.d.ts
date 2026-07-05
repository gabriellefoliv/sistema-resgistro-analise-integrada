import { Request, Response } from "express";
export declare class CastrationController {
    private auditService;
    private castrationService;
    private formId;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=castrationController.d.ts.map