import { Request, Response } from "express";
declare class AuditController {
    createLog(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    checkEditPermission(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { AuditController };
//# sourceMappingURL=auditController.d.ts.map