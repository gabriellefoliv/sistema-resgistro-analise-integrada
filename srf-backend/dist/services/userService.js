"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const __1 = require("..");
const jsonwebtoken_1 = require("jsonwebtoken");
const mailtrap_1 = require("../libs/mailtrap");
class UserService {
    async create(data) {
        const { name, email, password } = data;
        // Verificações
        const userAlreadyExists = await __1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (userAlreadyExists)
            throw new Error('Email já cadastrado.');
        // Criação do usuário
        const passwordHash = await (0, bcryptjs_1.hash)(password, 10);
        return await __1.prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: { select: { name: true } }
            }
        });
    }
    async delete(targetId, requesterId) {
        // Verificações
        if (targetId === requesterId)
            throw new Error('Usuário não pode excluir a si mesmo.');
        if (!targetId)
            throw new Error('ID do usuário é obrigatório.');
        const user = await __1.prisma.user.findUnique({
            where: { id: targetId },
            include: { role: { select: { name: true } } }
        });
        if (!user)
            throw new Error('Usuario não encontrado');
        const isAdmin = user?.role?.name === 'admin' || user?.role?.name === 'owner';
        if (isAdmin)
            throw new Error('Usuarios admins não podem ser excluídos.');
        // Remoção dos acessos específicos do usuário
        const userAccessIds = await __1.prisma.userAccess.findMany({ where: { userId: targetId }, select: { id: true } });
        const idsToDelete = userAccessIds.map((item) => item.id);
        await __1.prisma.userAccess.deleteMany({ where: { id: { in: idsToDelete } } });
        // Remoção do usuário
        return await __1.prisma.user.delete({ where: { id: targetId } });
    }
    async updateDetails(data, requesterId) {
        // Verifica se o usuário existe
        const user = await __1.prisma.user.findUnique({
            where: { id: data.id },
            include: { role: { select: { name: true } } }
        });
        if (!user)
            throw new Error('Usuário não encontrado.');
        // Verificações
        if (user.role?.name === 'owner' && data.id !== requesterId)
            throw new Error('Outros usuários não podem alterar um usuário superadministrador.');
        if (user.email !== data.email.toLowerCase()) {
            const userAlreadyExists = await __1.prisma.user.findUnique({
                where: { email: data.email.toLowerCase() }
            });
            if (userAlreadyExists)
                throw new Error('Email já cadastrado.');
        }
        // Alteração dos dados
        return await __1.prisma.user.update({
            where: { id: data.id },
            data: {
                name: data.name,
                email: data.email.toLowerCase()
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }
    async updateRole(data, requesterId) {
        // Verificações
        const requester = await __1.prisma.user.findUnique({
            where: { id: requesterId },
            include: { role: { select: { name: true } } }
        });
        if (!requester)
            throw new Error('Usuário solicitante não encontrado.');
        if (requester.role?.name !== 'owner' && requester.role?.name !== 'admin')
            throw new Error('Apenas administradores podem alterar funções.');
        if (data.roleName == 'owner')
            throw new Error('Função superadministrador não pode ser atribuída.');
        const targetUser = await __1.prisma.user.findUnique({
            where: { id: data.id },
            include: { role: { select: { name: true } } }
        });
        if (!targetUser)
            throw new Error('Usuário não encontrado.');
        if (targetUser.role?.name === 'owner')
            throw new Error('Função superadministrador não pode ser removida.');
        if (targetUser.role?.name === 'admin' && requesterId !== data.id)
            throw new Error('Apenas o superadministrador pode alterar a função de um administrador.');
        const roleExists = await __1.prisma.role.findFirst({ where: { name: data.roleName } });
        if (!roleExists)
            throw new Error('Função não existe.');
        return await __1.prisma.user.update({
            where: { id: data.id },
            data: { roleId: roleExists.id }
        });
    }
    async updatePassword(data, requesterId) {
        // Verificações do usuário
        const user = await __1.prisma.user.findUnique({ where: { id: data.id } });
        if (!user)
            throw new Error('Usuário não encontrado.');
        if (user.id !== requesterId)
            throw new Error('Apenas o próprio usuário pode alterar sua senha.');
        // Verificações de senhas
        const passwordMatch = await (0, bcryptjs_1.compare)(data.password, user.password);
        if (!passwordMatch)
            throw new Error('Senha atual incorreta.');
        if (data.newPassword !== data.confirmPassword)
            throw new Error('As senhas não coincidem.');
        if (data.newPassword === data.password)
            throw new Error('A nova senha deve ser diferente da senha atual.');
        // Alteração da senha
        const newPasswordHash = await (0, bcryptjs_1.hash)(data.newPassword, 10);
        await __1.prisma.user.update({
            where: { id: data.id },
            data: { password: newPasswordHash },
            select: { id: true }
        });
        return;
    }
    async updateUserAccess(data, requesterId) {
        const { userId, userAccess } = data;
        // Verificações
        const targetUser = await __1.prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
        if (!targetUser)
            throw new Error('Usuário não encontrado');
        if (targetUser.role?.name === 'owner' && userId !== requesterId)
            throw new Error('Outros usuários não podem alterar um usuário superadmin');
        // Alteração dos acessos
        return await __1.prisma.$transaction(async (tx) => {
            await tx.userAccess.deleteMany({ where: { userId: userId } });
            if (userAccess.length > 0) {
                for (const access of userAccess) {
                    const form = await tx.form.findFirst({ where: { id: access.formId } });
                    if (!form)
                        throw new Error(`Formulário '${access.formId}' não encontrado`);
                    let accessLevelId = null;
                    if (access.accessLevelId) {
                        const foundAccessLevel = await tx.enumAccessLevel.findFirst({ where: { id: access.accessLevelId } });
                        if (foundAccessLevel)
                            accessLevelId = foundAccessLevel.id;
                    }
                    await tx.userAccess.create({
                        data: {
                            userId: userId,
                            formId: form.id,
                            accessLevelId: accessLevelId
                        }
                    });
                }
            }
            return userAccess;
        });
    }
    async login(data) {
        const { email, password } = data;
        // Verificações
        const user = await __1.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                userPic: true,
                role: { select: { name: true } }
            }
        });
        if (!user)
            throw new Error('Email incorreto');
        // Verificação de senha
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch)
            throw new Error('Senha incorreta');
        // Geração do token
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '7d',
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role.name,
                userPic: user.userPic,
            },
            token: token,
        };
    }
    async getAll() {
        const users = await __1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                userPic: true,
                role: { select: { name: true } }
            }
        });
        return users;
    }
    async forgotPassword(email) {
        const user = await __1.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user)
            throw new Error("Usuário não encontrado.");
        // Invalida tokens anteriores não utilizados do mesmo usuário
        await __1.prisma.passwordResetToken.updateMany({
            where: { userId: user.id, used: false },
            data: { used: true }
        });
        // Gera um token único para confirmação
        const { randomUUID } = require('crypto');
        const token = randomUUID();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
        await __1.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            }
        });
        // Monta o link de confirmação apontando para o frontend
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const confirmLink = `${frontendUrl}/reset-password/confirm/${token}`;
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
                <h2 style="color: #333; margin-bottom: 16px;">Recuperação de Senha</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Olá, <strong>${user.name}</strong>!
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para confirmar:
                </p>
                <div style="text-align: center; margin: 28px 0;">
                    <a href="${confirmLink}" 
                       style="display: inline-block; background: #4e95d9; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                        Confirmar Redefinição de Senha
                    </a>
                </div>
                <p style="color: #999; font-size: 13px; line-height: 1.4;">
                    Este link expira em 15 minutos. Se você não solicitou a redefinição de senha, ignore este email.
                </p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
                <p style="color: #bbb; font-size: 12px; text-align: center;">SiRAI — Sistema de Registro e Análise Integrada</p>
            </div>
        `;
        const textBody = `Olá ${user.name}, clique no link para redefinir sua senha: ${confirmLink} (expira em 15 minutos).`;
        await (0, mailtrap_1.sendEmail)(email, 'Confirmação de Redefinição de Senha', textBody, htmlBody);
        return;
    }
    async confirmPasswordReset(token) {
        // Busca o token no banco
        const resetToken = await __1.prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true }
        });
        if (!resetToken)
            throw new Error('Token inválido.');
        if (resetToken.used)
            throw new Error('Token já utilizado.');
        if (resetToken.expiresAt < new Date())
            throw new Error('Token expirado.');
        // Gera uma nova senha aleatória
        const newPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await (0, bcryptjs_1.hash)(newPassword, 10);
        // Atualiza a senha do usuário e marca o token como usado
        await __1.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: resetToken.userId },
                data: { password: passwordHash }
            });
            await tx.passwordResetToken.update({
                where: { id: resetToken.id },
                data: { used: true }
            });
        });
        // Envia a nova senha por email
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
                <h2 style="color: #333; margin-bottom: 16px;">Sua Nova Senha</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Olá, <strong>${resetToken.user.name}</strong>!
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Sua senha foi redefinida com sucesso. Sua nova senha é:
                </p>
                <div style="text-align: center; margin: 24px 0; padding: 16px; background: #fff; border: 2px dashed #4e95d9; border-radius: 8px;">
                    <span style="font-size: 24px; font-weight: bold; color: #4e95d9; letter-spacing: 2px;">${newPassword}</span>
                </div>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Recomendamos que você altere essa senha após o primeiro login.
                </p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
                <p style="color: #bbb; font-size: 12px; text-align: center;">SiRAI — Sistema de Registro e Análise Integrada</p>
            </div>
        `;
        const textBody = `Olá ${resetToken.user.name}, sua nova senha é: ${newPassword}. Recomendamos que altere a senha após o primeiro login.`;
        await (0, mailtrap_1.sendEmail)(resetToken.user.email, 'Sua Nova Senha — SiRAI', textBody, htmlBody);
        return;
    }
    async getUserAccess(userId) {
        if (!userId)
            throw new Error('ID do usuário inválido');
        const user = await __1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new Error('Usuário não encontrado');
        const userAccess = await __1.prisma.userAccess.findMany({
            where: { userId: userId },
            select: {
                form: {
                    select: {
                        id: true,
                    }
                },
                enumAccessLevel: true,
            }
        });
        return userAccess.map((access) => {
            return {
                formId: access.form.id,
                accessLevelId: access.enumAccessLevel?.id,
            };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map