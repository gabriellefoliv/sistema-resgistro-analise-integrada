"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
const __1 = require("..");
function authMiddleware(permission) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ message: 'Token não fornecido' });
        const [, token] = authHeader.split(' ');
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            const user_id = decoded.sub;
            req.userId = user_id;
            if (permission) {
                const user = await __1.prisma.user.findUnique({
                    where: { id: user_id }, select: { role: { select: { name: true } } }
                });
                if (user?.role?.name !== 'admin' && user?.role?.name !== 'owner')
                    return res.status(403).json({ message: 'Acesso negado' });
                return next();
            }
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    };
}
//# sourceMappingURL=authMiddleware.js.map