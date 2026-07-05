import { Request, Response } from "express";
declare class FormController {
    getNavigationOptions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getForms(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAccessLevel(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { FormController };
//# sourceMappingURL=formController.d.ts.map