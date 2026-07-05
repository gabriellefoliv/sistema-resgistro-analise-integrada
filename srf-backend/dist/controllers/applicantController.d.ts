import { Request, Response } from "express";
declare class ApplicantController {
    createApplicant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getApplicants(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    acceptApplicant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    rejectApplicant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { ApplicantController };
//# sourceMappingURL=applicantController.d.ts.map