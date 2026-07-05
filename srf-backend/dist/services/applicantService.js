"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantService = void 0;
const __1 = require("..");
const applicantModel_1 = require("../models/applicantModel");
const userService_1 = require("./userService");
class ApplicantService {
    async createApplicant(data) {
        const { name, email, password, message } = applicantModel_1.createApplicantRequest.parse(data);
        // Verificações
        const emailAlreadyExists = await __1.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        }) || await __1.prisma.applicant.findUnique({
            where: { email: email.toLowerCase() }
        });
        if (emailAlreadyExists)
            throw new Error('Email já utilizado');
        // Criação do solicitante
        const applicant = await __1.prisma.applicant.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: password,
                message: message || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
            }
        });
        return applicant;
    }
    async getApplicants() {
        const applicants = await __1.prisma.applicant.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                date: true,
                message: true,
            }
        });
        return applicants;
    }
    async acceptApplicant(id) {
        if (!id)
            throw new Error('Identificador (ID) é obrigatório');
        const applicant = await __1.prisma.applicant.findUnique({ where: { id: id } });
        if (!applicant)
            throw new Error('Solicitante não encontrado');
        const userService = new userService_1.UserService();
        const userData = {
            name: applicant.name,
            email: applicant.email.toLowerCase(),
            password: applicant.password,
        };
        const user = await userService.create(userData);
        await __1.prisma.applicant.delete({ where: { id: id } });
        return user;
    }
    async rejectApplicant(id) {
        // Verificações
        if (!id)
            throw new Error('Identificador (ID) é obrigatório');
        const applicant = await __1.prisma.applicant.findUnique({ where: { id: id } });
        if (!applicant)
            throw new Error('Solicitante não encontrado');
        // Remoção do solicitante
        const deletedApplicant = await __1.prisma.applicant.delete({ where: { id: id } });
        return deletedApplicant;
    }
}
exports.ApplicantService = ApplicantService;
//# sourceMappingURL=applicantService.js.map