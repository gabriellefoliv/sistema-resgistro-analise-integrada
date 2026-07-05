import { UserCreateInput, UserUpdateDetailsInput, UserUpdateRoleInput, UserUpdatePasswordInput, UserUpdateAccessInput, UserLoginInput } from "srf-shared-types";
export declare class UserService {
    create(data: UserCreateInput): Promise<{
        name: string;
        id: string;
        email: string;
        role: {
            name: string;
        };
    }>;
    delete(targetId: string, requesterId: string): Promise<{
        password: string;
        name: string;
        id: string;
        email: string;
        roleId: string;
        userPic: string | null;
    }>;
    updateDetails(data: UserUpdateDetailsInput, requesterId: string): Promise<{
        name: string;
        id: string;
        email: string;
    }>;
    updateRole(data: UserUpdateRoleInput, requesterId: string): Promise<{
        password: string;
        name: string;
        id: string;
        email: string;
        roleId: string;
        userPic: string | null;
    }>;
    updatePassword(data: UserUpdatePasswordInput, requesterId: string): Promise<void>;
    updateUserAccess(data: UserUpdateAccessInput, requesterId: string): Promise<{
        formId: string;
        accessLevelId?: string | undefined;
    }[]>;
    login(data: UserLoginInput): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            userPic: string | null;
        };
        token: string;
    }>;
    getAll(): Promise<{
        name: string;
        id: string;
        email: string;
        role: {
            name: string;
        };
        userPic: string | null;
    }[]>;
    forgotPassword(email: string): Promise<void>;
    confirmPasswordReset(token: string): Promise<void>;
    getUserAccess(userId: string): Promise<{
        formId: string;
        accessLevelId: string | undefined;
    }[]>;
}
//# sourceMappingURL=userService.d.ts.map