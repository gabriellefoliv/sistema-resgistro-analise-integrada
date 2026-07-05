import { Request, Response } from "express";
declare class UserController {
    private userService;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateRole: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUserAccess: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    forgotPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    confirmPasswordReset: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getUserAccess: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export { UserController };
//# sourceMappingURL=userController.d.ts.map