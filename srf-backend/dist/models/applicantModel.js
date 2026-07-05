"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicantRequest = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createApplicantRequest = zod_1.default.object({
    name: zod_1.default.string().nonempty({ error: 'Nome inválido' }),
    email: zod_1.default.email({ error: 'Email inválido' }),
    password: zod_1.default.string().nonempty({ error: 'Senha inválida' }),
    message: zod_1.default.string().optional(),
});
//# sourceMappingURL=applicantModel.js.map