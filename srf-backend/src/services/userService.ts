import { compare, hash } from "bcryptjs";
import { prisma } from "..";
import { sign } from "jsonwebtoken";
import { sendEmail } from "../libs/mailtrap";
import {
    UserCreateInput,
    UserUpdateDetailsInput,
    UserUpdatePasswordInput,
    UserUpdateAccessInput,
    UserLoginInput
} from "srf-shared-types";

export class UserService {

    async create(data: UserCreateInput) {
        const { name, email, password } = data;

        // Verificações
        const userAlreadyExists = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (userAlreadyExists) throw new Error('Email já cadastrado');

        // Criação do usuário
        const passwordHash = await hash(password, 10);

        return await prisma.user.create({
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

    async delete(targetId: string, requesterId: string) {
        // Verificações
        if (targetId === requesterId) throw new Error('Usuário não pode excluir a si mesmo');
        if (!targetId) throw new Error('ID do usuário é obrigatório');

        const user = await prisma.user.findUnique({
            where: { id: targetId },
            include: { role: { select: { name: true } } }
        });
        if (!user) throw new Error('Usuario não encontrado');

        const isAdmin = user?.role?.name === 'admin' || user?.role?.name === 'owner';
        if (isAdmin) throw new Error('Usuarios admins não podem ser excluídos');

        // Remoção dos acessos específicos do usuário
        const userAccessIds = await prisma.userAccess.findMany({ where: { userId: targetId }, select: { id: true } });
        const idsToDelete = userAccessIds.map((item) => item.id);
        await prisma.userAccess.deleteMany({ where: { id: { in: idsToDelete } } });

        // Remoção do usuário
        return await prisma.user.delete({ where: { id: targetId } });
    }

    async updateDetails(data: UserUpdateDetailsInput, requesterId: string) {
        const { id, name, email, roleName } = data;

        // Verificações
        const targetUser = await prisma.user.findUnique({
            where: { id: id },
            include: { role: true }
        });
        if (!targetUser) throw new Error('Usuário não encontrado');
        if (targetUser.role?.name === 'owner' && id !== requesterId) throw new Error('Outros usuários não podem alterar um usuário superadmin');

        if (targetUser.email !== email.toLowerCase()) {
            const userAlreadyExists = await prisma.user.findUnique({
                where: { email: email.toLowerCase() }
            });
            if (userAlreadyExists) throw new Error('Email já cadastrado');
        }

        // Alteração dos dados
        const dataToChange: any = { name, email };

        const role = await prisma.role.findFirst({
            where: { name: roleName }
        });
        if (!role) throw new Error('Função não existe');

        if (targetUser.role?.name === 'owner' && role?.name !== 'owner') throw new Error('Função superadmin não pode ser removida');
        if (role?.name === 'owner' && targetUser.role?.name !== 'owner') throw new Error('Função superadmin não pode ser atribuída');
        dataToChange.roleId = role?.id;

        return await prisma.user.update({
            where: { id: id },
            data: dataToChange,
            select: {
                id: true,
                name: true,
                email: true,
                userPic: true,
                role: { select: { name: true } }
            }
        });
    }

    async updatePassword(data: UserUpdatePasswordInput, requesterId: string) {
        const { id, password } = data;

        // Verificações
        const targetUser = await prisma.user.findUnique({ where: { id: id }, include: { role: true } });
        if (!targetUser) throw new Error('Usuário não encontrado');
        if (targetUser.role?.name === 'owner' && id !== requesterId) throw new Error('Outros usuários não podem alterar um usuário superadmin');

        // Alteração da senha
        const passwordHash = await hash(password, 10);
        return await prisma.user.update({
            where: { id: id },
            data: { password: passwordHash },
            select: { id: true }
        });
    }

    async updateUserAccess(data: UserUpdateAccessInput, requesterId: string) {
        const { userId, userAccess } = data;

        // Verificações
        const targetUser = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
        if (!targetUser) throw new Error('Usuário não encontrado');
        if (targetUser.role?.name === 'owner' && userId !== requesterId) throw new Error('Outros usuários não podem alterar um usuário superadmin');

        // Alteração dos acessos
        return await prisma.$transaction(async (tx) => {
            await tx.userAccess.deleteMany({ where: { userId: userId } });

            if (userAccess.length > 0) {
                for (const access of userAccess) {
                    const form = await tx.form.findFirst({ where: { id: access.formId } });
                    if (!form) throw new Error(`Formulário '${access.formId}' não encontrado`);

                    let accessLevelId: string | null = null;
                    if (access.accessLevelId) {
                        const foundAccessLevel = await tx.enumAccessLevel.findFirst({ where: { id: access.accessLevelId } });
                        if (foundAccessLevel) accessLevelId = foundAccessLevel.id;
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


    async login(data: UserLoginInput) {
        const { email, password } = data;

        // Verificações
        const user = await prisma.user.findUnique({
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
        if (!user) throw new Error('Email incorreto');

        // Verificação de senha
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) throw new Error('Senha incorreta');

        // Geração do token
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '7d',
            }
        );
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
        const users = await prisma.user.findMany({
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

    async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) throw new Error("Email não cadastrado");

        const password = Math.random().toString(36).slice(-8);
        await this.updatePassword({ id: user.id, password: password }, user.id);
        await sendEmail(email, 'Recuperação de Senha', 'Sua nova senha: ' + password);
        return user;
    }

    async getUserAccess(userId: string) {
        if (!userId) throw new Error('ID do usuário inválido');
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('Usuário não encontrado');
        const userAccess = await prisma.userAccess.findMany({
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