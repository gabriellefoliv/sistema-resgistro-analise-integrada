"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicantRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const applicantController_1 = require("../controllers/applicantController");
exports.applicantRoutes = (0, express_1.Router)();
const applicantController = new applicantController_1.ApplicantController();
exports.applicantRoutes.get('/applicant/get-all', (0, authMiddleware_1.authMiddleware)('admin'), applicantController.getApplicants);
exports.applicantRoutes.post('/applicant/create', applicantController.createApplicant);
exports.applicantRoutes.post('/applicant/accept', (0, authMiddleware_1.authMiddleware)('admin'), applicantController.acceptApplicant);
exports.applicantRoutes.delete('/applicant/reject', (0, authMiddleware_1.authMiddleware)('admin'), applicantController.rejectApplicant);
//# sourceMappingURL=applicantRoutes.js.map