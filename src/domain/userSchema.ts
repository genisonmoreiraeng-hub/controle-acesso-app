import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().trim().min(1, 'Informe o login'),
  password: z.string().min(1, 'Informe a senha'),
});

export const userFormSchema = z
  .object({
    name: z.string().trim().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    login: z
      .string()
      .trim()
      .min(3, 'Login deve ter no mínimo 3 caracteres')
      .regex(/^[a-zA-Z0-9._-]+$/, 'Login não deve conter espaços'),
    password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export const storedUserArraySchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    login: z.string(),
    password: z.string(),
  })
);

export type LoginInput = z.infer<typeof loginSchema>;
export type UserFormInput = z.infer<typeof userFormSchema>;