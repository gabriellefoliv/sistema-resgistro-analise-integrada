"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFormMiddleware = authFormMiddleware;
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const __1 = require("..");
function authFormMiddleware(requiredLevelId) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ message: 'Token não fornecido' });
        const [, token] = authHeader.split(' ');
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            const user_id = decoded.sub;
            req.userId = user_id;
            const auditLogId = req.params.auditLogId || req.body.auditLogId;
            const user = await __1.prisma.user.findUnique({
                where: { id: user_id }, select: { role: { select: { name: true } } }
            });
            if (auditLogId) {
                const auditLog = await __1.prisma.auditLog.findUnique({
                    where: { id: auditLogId }
                });
                if (!auditLog)
                    return res.status(404).json({ message: 'Formulário não encontrado' });
                if (user?.role?.name === 'admin' || user?.role?.name === 'owner')
                    return next();
                if (requiredLevelId) {
                    const levels = await __1.prisma.enumAccessLevel.findMany({ select: { id: true, value: true } });
                    const requiredLevel = levels.find((level) => level.id === requiredLevelId);
                    if (!requiredLevel)
                        return res.status(404).json({ message: 'Nível de acesso não encontrado' });
                    const userAccess = await __1.prisma.userAccess.findFirst({
                        where: { userId: user_id, formId: auditLog.formId }
                    });
                    if (!userAccess)
                        return res.status(403).json({ message: 'Acesso negado' });
                    const userLevel = levels.find((level) => level.id === userAccess.accessLevelId)?.value;
                    let needsLevel = requiredLevel.value;
                    if (requiredLevel.id === 'edit' && auditLog.userId !== user_id)
                        needsLevel = levels.find((level) => level.id === 'edit_unrestricted')?.value;
                    if (userLevel < needsLevel)
                        return res.status(403).json({ message: 'Acesso negado' });
                }
            }
            else {
                if (user?.role?.name === 'admin' || user?.role?.name === 'owner')
                    return next();
            }
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    };
}
//# sourceMappingURL=authFormMiddleware.js.map