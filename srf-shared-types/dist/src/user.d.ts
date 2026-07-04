import z from "zod";
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    roleId: z.ZodString;
    userPic: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userLoginInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const userCreateInputSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const userUpdateDetailsInputSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
export declare const userUpdateRoleInputSchema: z.ZodObject<{
    id: z.ZodString;
    roleName: z.ZodString;
}, z.core.$strip>;
export declare const userUpdatePasswordInputSchema: z.ZodObject<{
    id: z.ZodString;
    password: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const userAccessPropsSchema: z.ZodObject<{
    formId: z.ZodString;
    accessLevelId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userUpdateAccessInputSchema: z.ZodObject<{
    userId: z.ZodString;
    userAccess: z.ZodArray<z.ZodObject<{
        formId: z.ZodString;
        accessLevelId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type User = z.infer<typeof userSchema>;
export type UserLoginInput = z.infer<typeof userLoginInputSchema>;
export type UserCreateInput = z.infer<typeof userCreateInputSchema>;
export type UserUpdateDetailsInput = z.infer<typeof userUpdateDetailsInputSchema>;
export type UserUpdatePasswordInput = z.infer<typeof userUpdatePasswordInputSchema>;
export type UserAccessProps = z.infer<typeof userAccessPropsSchema>;
export type UserUpdateAccessInput = z.infer<typeof userUpdateAccessInputSchema>;
export type UserUpdateRoleInput = z.infer<typeof userUpdateRoleInputSchema>;
//# sourceMappingURL=user.d.ts.map