import 'dotenv/config';
import { NextFunction, Request, Response } from "express";
export declare function authFormMiddleware(requiredLevelId?: string): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=authFormMiddleware.d.ts.map