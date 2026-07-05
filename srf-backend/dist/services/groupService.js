"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const __1 = require("..");
class GroupService {
    async getAllGroups() {
        const groupAccesses = await __1.prisma.groupAccess.findMany({
            select: {
                group: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                form: {
                    select: {
                        id: true,
                    }
                },
                enumAccessLevel: {
                    select: {
                        id: true,
                    }
                }
            }
        });
        let groups = [];
        groupAccesses.forEach(access => {
            const groupId = access.group?.id;
            if (!groupId)
                return;
            const group = groups.find(g => g.id === access.group.id);
            if (group) {
                group.groupAccess.push({
                    formId: access.form.id,
                    accessLevelId: access.enumAccessLevel?.id ?? null
                });
            }
            else {
                groups.push({
                    id: access.group.id,
                    name: access.group.name,
                    groupAccess: [{
                            formId: access.form.id,
                            accessLevelId: access.enumAccessLevel?.id ?? null
                        }]
                });
            }
        });
        return groups;
    }
}
exports.GroupService = GroupService;
//# sourceMappingURL=groupService.js.map