"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantController = void 0;
const applicantService_1 = require("../services/applicantService");
const zod_1 = require("zod");
class ApplicantController {
    async createApplicant(req, res) {
        try {
            const data = req.body;
            const applicantService = new applicantService_1.ApplicantService();
            const applicant = await applicantService.createApplicant(data);
            return res.status(201).json(applicant);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: error.flatten().fieldErrors,
                });
            }
            if (error.message === 'Email já utilizado')
                return res.status(409).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
    async getApplicants(req, res) {
        const applicantService = new applicantService_1.ApplicantService();
        const applicants = await applicantService.getApplicants();
        return res.status(201).json(applicants);
    }
    async acceptApplicant(req, res) {
        try {
            const { id } = req.body;
            const applicantService = new applicantService_1.ApplicantService();
            const user = await applicantService.acceptApplicant(id);
            return res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: error.flatten().fieldErrors,
                });
            }
            if (error.message === 'Identificador (ID) é obrigatório' || error.message === 'Solicitante não encontrado')
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
    async rejectApplicant(req, res) {
        try {
            const id = req.query.applicant_id;
            const applicantService = new applicantService_1.ApplicantService();
            await applicantService.rejectApplicant(id);
            return res.status(200).json({ message: 'Solicitante rejeitado' });
        }
        catch (error) {
            if (error.message === 'Identificador (ID) é obrigatório')
                return res.status(400).json({ message: error.message });
            if (error.message === 'Solicitante não encontrado')
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
}
exports.ApplicantController = ApplicantController;
//# sourceMappingURL=applicantController.js.map