"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const groupService_1 = require("../services/groupService");
class GroupController {
    async getAllGroups(req, res) {
        const groupService = new groupService_1.GroupService();
        const groups = await groupService.getAllGroups();
        return res.status(200).json(groups);
    }
}
exports.GroupController = GroupController;
//# sourceMappingURL=groupController.js.map