import { Request, Response } from "express";
export declare class NecropsyExamResultController {
    private auditService;
    private service;
    private formId;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getCPCRFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateCPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteCPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getQPCRFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createQPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateQPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteQPCR: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=necropsyExamResultController.d.ts.map