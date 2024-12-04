import { z } from "zod";

export const useValidateRegister = () => {
  const registerValidationSchema = z.object({
    username: z
      .string()
      .min(3, "username minimal 3 karakter")
      .max(16, "username maksimal 16 karakter"),
    email: z.string().email(),
    password: z.string().min(8, "password minimal 8 karakter"),
  });

  return { registerValidationSchema };
};

export const useValidationLogin = () => {
  const loginValidationSchema = z.object({
    username: z
      .string()
      .min(3, "username minimal 3 karakter")
      .max(16, "username maksimal 16 karakter"),
    password: z.string().min(8, "password minimal 8 karakter"),
  });

  return { loginValidationSchema };
};
