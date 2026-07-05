"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const zod_1 = require("zod");
class UserController {
    userService = new userService_1.UserService();
    create = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.create({ name, email, password });
            return res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Email já cadastrado')
                return res.status(409).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    };
    delete = async (req, res) => {
        try {
            const targetId = req.query.user_id;
            const requesterId = req.userId;
            await this.userService.delete(targetId, requesterId);
            return res.status(200).json({ message: 'Usuário excluído' });
        }
        catch (error) {
            if (error.message === 'Usuário não pode excluir a si mesmo')
                return res.status(400).json({ message: error.message });
            if (error.message === 'ID do usuário é obrigatório')
                return res.status(400).json({ message: error.message });
            if (error.message === 'Usuario não encontrado')
                return res.status(404).json({ message: error.message });
            if (error.message === 'Usuarios admins não podem ser excluídos')
                return res.status(403).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    };
    updateDetails = async (req, res) => {
        try {
            const data = req.body;
            const requesterId = req.userId;
            const updatedUser = await this.userService.updateDetails(data, requesterId);
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado.')
                return res.status(404).json({ message: error.message });
            if (error.message === 'Outros usuários não podem alterar um usuário superadministrador.')
                return res.status(403).json({ message: error.message });
            if (error.message === 'Email já cadastrado.')
                return res.status(409).json({ message: error.message });
            return res.status(500).json({ message: "Erro interno" });
        }
    };
    updateRole = async (req, res) => {
        try {
            const data = req.body;
            const requesterId = req.userId;
            const updatedUser = await this.userService.updateRole(data, requesterId);
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário solicitante não encontrado.')
                return res.status(404).json({ message: error.message });
            if (error.message === 'Apenas administradores podem alterar funções.')
                return res.status(403).json({ message: error.message });
            if (error.message === 'Função superadministrador não pode ser atribuída.')
                return res.status(403).json({ message: error.message });
            if (error.message === 'Usuário não encontrado.')
                return res.status(404).json({ message: error.message });
            if (error.message === 'Função superadministrador não pode ser removida.')
                return res.status(403).json({ message: error.message });
            if (error.message === 'Apenas o superadministrador pode alterar a função de um administrador.')
                return res.status(403).json({ message: error.message });
            if (error.message === 'Função não existe.')
                return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: "Erro interno" });
        }
    };
    updatePassword = async (req, res) => {
        try {
            const data = req.body;
            const requesterId = req.userId;
            await this.userService.updatePassword(data, requesterId);
            return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado.')
                return res.status(404).json({ error: error.message });
            if (error.message === 'Apenas o próprio usuário pode alterar sua senha.')
                return res.status(401).json({ error: error.message });
            if (error.message === 'Senha atual incorreta.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'As senhas não coincidem.')
                return res.status(400).json({ error: error.message });
            if (error.message === 'A nova senha deve ser diferente da senha atual.')
                return res.status(400).json({ error: error.message });
            return res.status(500).json({ error: "Erro interno" });
        }
    };
    updateUserAccess = async (req, res) => {
        try {
            const { userId, userAccess } = req.body;
            const requesterId = req.userId;
            await this.userService.updateUserAccess({ userId, userAccess }, requesterId);
            return res.status(200).json({ message: 'Acessos atualizados com sucesso' });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado')
                return res.status(404).json({ message: error.message });
            if (error.message === 'Outros usuários não podem alterar um usuário superadmin')
                return res.status(403).json({ message: error.message });
            if (error.message.includes('Formulário'))
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ error: "Erro interno" });
        }
    };
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const login = await this.userService.login({ email, password });
            return res.status(200).json(login);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message.includes('incorreta'))
                return res.status(401).json({ message: error.message });
            return res.status(401).json({ message: error.message || 'Erro durante o login' });
        }
    };
    getAll = async (req, res) => {
        try {
            const users = await this.userService.getAll();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    };
    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            await this.userService.forgotPassword(email);
            return res.status(200).json({ message: 'Se o email informado estiver cadastrado, você receberá um email de confirmação.' });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ message: error.flatten().fieldErrors });
            }
            if (error.message === 'Usuário não encontrado.')
                return res.status(200).json({ message: 'Se o email informado estiver cadastrado, você receberá um email de confirmação.' });
            return res.status(500).json({ message: 'Erro interno.' });
        }
    };
    confirmPasswordReset = async (req, res) => {
        try {
            const token = req.query.token;
            if (!token)
                return res.status(400).json({ message: 'Token não fornecido.' });
            await this.userService.confirmPasswordReset(token);
            return res.status(200).json({ message: 'Senha redefinida com sucesso. Verifique seu email para obter a nova senha.' });
        }
        catch (error) {
            if (error.message === 'Token inválido.')
                return res.status(400).json({ message: error.message });
            if (error.message === 'Token já utilizado.')
                return res.status(400).json({ message: error.message });
            if (error.message === 'Token expirado.')
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno.' });
        }
    };
    getUserAccess = async (req, res) => {
        try {
            const userId = req.params.userId;
            const userAccess = await this.userService.getUserAccess(userId);
            return res.status(200).json(userAccess);
        }
        catch (error) {
            if (error.message === 'ID do usuário inválido')
                return res.status(400).json({ message: error.message });
            if (error.message === 'Usuário não encontrado')
                return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map