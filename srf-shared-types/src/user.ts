import z from "zod";

export const userSchema = z.object({
    id: z.string().nonempty({ error: 'ID do usuário inválido' }),
    name: z.string().nonempty({ error: 'Nome inválido' }),
    email: z.email({ error: 'Email inválido' }),
    password: z.string().nonempty({ error: 'Senha inválida' }),
    roleId: z.string().nonempty({ error: 'ID da função inválido' }),
    userPic: z.string().optional()
});

export const userLoginInputSchema = z.object({
    email: z.string().nonempty({ error: 'Email inválido' }),
    password: z.string().nonempty({ error: 'Senha inválida' })
});

export const userCreateInputSchema = z.object({
    name: z.string().nonempty({ error: 'Nome inválido' }),
    email: z.string().nonempty({ error: 'Email inválido' }),
    password: z.string().nonempty({ error: 'Senha inválida' })
});

export const userUpdateDetailsInputSchema = z.object({
    id: z.string().nonempty({ error: 'ID do usuário inválido' }),
    name: z.string().nonempty({ error: 'Nome inválido' }),
    email: z.string().nonempty({ error: 'Email inválido' }),
    roleName: z.string().nonempty({ error: 'Nome da função inválido' })
});

export const userUpdatePasswordInputSchema = z.object({
    id: z.string().nonempty({ error: 'ID do usuário inválido' }),
    password: z.string().nonempty({ error: 'Senha inválida' })
});

export const userAccessPropsSchema = z.object({
    formId: z.string().nonempty({ error: 'ID do formulário inválido' }),
    accessLevelId: z.string().optional(),
});

export const userUpdateAccessInputSchema = z.object({
    userId: z.string().nonempty({ error: 'ID do usuário inválido' }),
    userAccess: z.array(userAccessPropsSchema),
});

export type User = z.infer<typeof userSchema>;
export type UserLoginInput = z.infer<typeof userLoginInputSchema>;
export type UserCreateInput = z.infer<typeof userCreateInputSchema>;
export type UserUpdateDetailsInput = z.infer<typeof userUpdateDetailsInputSchema>;
export type UserUpdatePasswordInput = z.infer<typeof userUpdatePasswordInputSchema>;
export type UserAccessProps = z.infer<typeof userAccessPropsSchema>;
export type UserUpdateAccessInput = z.infer<typeof userUpdateAccessInputSchema>;