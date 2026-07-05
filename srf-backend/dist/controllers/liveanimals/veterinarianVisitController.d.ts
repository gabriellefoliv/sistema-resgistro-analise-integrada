import { Request, Response } from "express";
declare class VeterinarianVisitController {
    private auditService;
    private veterinarianVisitService;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getFormOptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export { VeterinarianVisitController };
//# sourceMappingURL=veterinarianVisitController.d.ts.map