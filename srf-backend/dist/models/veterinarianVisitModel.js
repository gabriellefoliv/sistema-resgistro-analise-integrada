"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veterinarianVisitUpdateInput = exports.veterinarianVisitCreateInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.veterinarianVisitCreateInput = zod_1.default.object({
    liveAnimalId: zod_1.default.number().positive({ error: 'ID do animal inválido' }),
    veterinarianId: zod_1.default.number().positive({ error: 'ID do veterinário inválido' }),
    date: zod_1.default.string().nonempty({ error: 'Data inválida' }),
    animalPicture: zod_1.default.string().optional(),
    note: zod_1.default.string().optional(),
    bodyMeasurements: zod_1.default.array(zod_1.default.object({
        bodyMeasurementTypeId: zod_1.default.number().positive({ error: 'ID do tipo de medida corporal inválido' }),
        value: zod_1.default.number().positive({ error: 'Valor inválido' }),
    })).optional(),
});
exports.veterinarianVisitUpdateInput = zod_1.default.object({
    liveAnimalId: zod_1.default.number().positive({ error: 'ID do animal inválido' }),
    veterinarianId: zod_1.default.number().positive({ error: 'ID do veterinário inválido' }),
    date: zod_1.default.string().nonempty({ error: 'Data inválida' }),
    animalPicture: zod_1.default.string().optional(),
    note: zod_1.default.string().optional(),
    bodyMeasurements: zod_1.default.array(zod_1.default.object({
        bodyMeasurementTypeId: zod_1.default.number().positive({ error: 'ID do tipo de medida corporal inválido' }),
        value: zod_1.default.number().positive({ error: 'Valor inválido' }),
    })).optional(),
});
//# sourceMappingURL=veterinarianVisitModel.js.map