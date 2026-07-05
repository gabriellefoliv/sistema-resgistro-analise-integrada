import 'dotenv';
import { NextFunction, Request, Response } from "express";
export declare function authMiddleware(permission?: 'admin'): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=authMiddleware.d.ts.map