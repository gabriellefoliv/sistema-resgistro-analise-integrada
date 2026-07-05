"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequest = exports.updateUserPasswordRequest = exports.updateUserAccessRequest = exports.updateUserPicRequest = exports.updateUserDetailsRequest = exports.createUserRequest = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserRequest = zod_1.default.object({
    name: zod_1.default.string().nonempty({ error: 'Nome inválido' }),
    email: zod_1.default.email({ error: 'Email inválido' }),
    password: zod_1.default.string().nonempty({ error: 'Senha inválida' }),
});
exports.updateUserDetailsRequest = zod_1.default.object({
    userId: zod_1.default.string().nonempty({ error: 'ID do usuário inválido' }),
    name: zod_1.default.string().nonempty({ error: 'Nome inválido' }),
    email: zod_1.default.email({ error: 'Email inválido' }),
    role: zod_1.default.string().nonempty({ error: 'Função inválida' }),
});
exports.updateUserPicRequest = zod_1.default.object({
    userId: zod_1.default.string().nonempty({ error: 'ID do usuário inválido' }),
    userPic: zod_1.default.string().optional(),
});
const userAccessProps = zod_1.default.object({
    formId: zod_1.default.string().nonempty({ error: 'ID do furmulário inválido' }),
    accessLevelId: zod_1.default.string().optional(),
});
exports.updateUserAccessRequest = zod_1.default.object({
    userId: zod_1.default.string().nonempty({ error: 'ID do usuário inválido' }),
    userAccess: zod_1.default.array(userAccessProps),
});
exports.updateUserPasswordRequest = zod_1.default.object({
    userId: zod_1.default.string().nonempty({ error: 'ID do usuário inválido' }),
    password: zod_1.default.string().nonempty({ error: 'Senha inválida' }),
});
exports.loginRequest = zod_1.default.object({
    email: zod_1.default.email({ error: 'Email inválido' }),
    password: zod_1.default.string().nonempty({ error: 'Senha inválida' }),
});
//# sourceMappingURL=userModel.js.map