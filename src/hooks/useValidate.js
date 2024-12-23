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

export const useValidationResetPassword = () => {
  const resetPwValidationSchema = z.object({
    otp: z
      .string()
      .min(6, "kode verifikasi minimal 6 karakter")
      .max(6, "kode verifikasi maksimal 6 karakter")
      .optional(),
    email: z.string().email().min(1, "email wajib diisi").optional(),
    password: z.string().min(8, "password minimal 8 karakter").optional(),
  });

  return { resetPwValidationSchema };
};
