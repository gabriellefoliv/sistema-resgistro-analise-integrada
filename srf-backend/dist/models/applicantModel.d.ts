import z from "zod";
export declare const createApplicantRequest: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=applicantModel.d.ts.map