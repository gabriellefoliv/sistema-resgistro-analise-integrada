import z from "zod";
export declare const createUserRequest: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserDetailsRequest: z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodEmail;
    role: z.ZodString;
}, z.core.$strip>;
export declare const updateUserPicRequest: z.ZodObject<{
    userId: z.ZodString;
    userPic: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateUserAccessRequest: z.ZodObject<{
    userId: z.ZodString;
    userAccess: z.ZodArray<z.ZodObject<{
        formId: z.ZodString;
        accessLevelId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateUserPasswordRequest: z.ZodObject<{
    userId: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginRequest: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=userModel.d.ts.map