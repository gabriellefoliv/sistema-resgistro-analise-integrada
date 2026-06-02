import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ZodError } from "zod";
import {
    UserCreateInput,
    UserUpdateDetailsInput,
    UserUpdatePasswordInput,
    UserUpdateAccessInput,
    UserLoginInput
} from "srf-shared-types";

class UserController {
    private userService = new UserService();

    create = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body as UserCreateInput;
            const user = await this.userService.create(
                { name, email, password }
            );
            return res.status(201).json(user);
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Email já cadastrado') return res.status(409).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const targetId = req.query.user_id as string;
            const requesterId = req.userId as string;
            await this.userService.delete(
                targetId, requesterId
            );
            return res.status(200).json({ message: 'Usuário excluído' });
        } catch (error: any) {
            if (error.message === 'Usuário não pode excluir a si mesmo') return res.status(400).json({ message: error.message });
            if (error.message === 'ID do usuário é obrigatório') return res.status(400).json({ message: error.message });
            if (error.message === 'Usuario não encontrado') return res.status(404).json({ message: error.message })
            if (error.message === 'Usuarios admins não podem ser excluídos') return res.status(403).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    updateDetails = async (req: Request, res: Response) => {
        try {
            const { id, name, email, roleName } = req.body as UserUpdateDetailsInput;
            const requesterId = req.userId as string;
            const updatedUser = await this.userService.updateDetails(
                { id, name, email, roleName }, requesterId
            );
            return res.status(200).json(updatedUser);
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado') return res.status(404).json({ message: error.message });
            if (error.message === 'Outros usuários não podem alterar um usuário superadmin') return res.status(403).json({ message: error.message });
            if (error.message === 'Email já cadastrado') return res.status(409).json({ message: error.message });
            if (error.message === 'Função não existe') return res.status(400).json({ message: error.message });
            if (error.message === 'Função superadmin não pode ser removida' || error.message === 'Função superadmin não pode ser atribuída') return res.status(403).json({ message: error.message });
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    updatePassword = async (req: Request, res: Response) => {
        try {
            const { id, password } = req.body as UserUpdatePasswordInput;
            const requesterId = req.userId as string;
            const updatedUser = await this.userService.updatePassword(
                { id, password }, requesterId
            );
            return res.status(200).json(updatedUser);
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado') return res.status(404).json({ message: error.message });
            if (error.message === 'Outros usuários não podem alterar um usuário superadmin') return res.status(403).json({ message: error.message });
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    updateUserAccess = async (req: Request, res: Response) => {
        try {
            const { userId, userAccess } = req.body as UserUpdateAccessInput;
            const requesterId = req.userId as string;
            await this.userService.updateUserAccess(
                { userId, userAccess }, requesterId
            );
            return res.status(200).json({ message: 'Acessos atualizados com sucesso' });
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado') return res.status(404).json({ message: error.message });
            if (error.message === 'Outros usuários não podem alterar um usuário superadmin') return res.status(403).json({ message: error.message });
            if (error.message.includes('Formulário')) return res.status(400).json({ message: error.message });
            return res.status(500).json({ error: "Erro interno" });
        }
    }


    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as UserLoginInput;
            const login = await this.userService.login(
                { email, password }
            );
            return res.status(200).json(login);
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message.includes('incorreta')) return res.status(401).json({ message: error.message })
            return res.status(401).json({ message: error.message || 'Erro durante o login' });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAll();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            await this.userService.forgotPassword(
                email as string
            );
            return res.status(200).json({ message: 'Se o email informado estiver cadastrado, você receberá um email com a sua nova senha' });
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Email não cadastrado') return res.status(404).json({ message: 'Se o email informado estiver cadastrado, você receberá um email com a sua nova senha' });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    getUserAccess = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId as string;
            const userAccess = await this.userService.getUserAccess(userId);
            return res.status(200).json(userAccess);

        } catch (error: any) {
            if (error.message === 'ID do usuário inválido') return res.status(400).json({ message: error.message });
            if (error.message === 'Usuário não encontrado') return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

}

export { UserController };