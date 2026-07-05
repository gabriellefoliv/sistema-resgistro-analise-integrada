"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const __1 = require("..");
class FormService {
    async getNavigationOptions() {
        const options = await __1.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                categoryIcon: true,
                subCategory: {
                    select: {
                        id: true,
                        name: true,
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }
            }
        });
        return options.map(o => ({
            ...o,
            subCategory: o.subCategory.map(s => ({
                ...s,
                name: s.name.split('_')[1]
            }))
        }));
    }
    async getForms() {
        const categories = await __1.prisma.category.findMany({
            select: {
                name: true,
                subCategory: {
                    select: {
                        form: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            },
        });
        return categories.map((category) => {
            return {
                category: category.name,
                forms: category.subCategory.map((subCategory) => subCategory.form).flat(),
            };
        });
    }
    async getAccessLevel() {
        const levels = await __1.prisma.enumAccessLevel.findMany();
        return levels;
    }
}
exports.FormService = FormService;
//# sourceMappingURL=formService.js.map