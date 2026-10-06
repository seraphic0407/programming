import { object, string, ref, type InferType } from "yup";

export const postUserSchema = object({
  username: string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  email: string().email("Email tidak valid").required("Email wajib diisi"),
  firstName: string().required("First name wajib diisi"),
  lastName: string().optional(),
  phone: string().optional(),
  location: string().optional(),
  password: string()
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

export type PostUserBody = InferType<typeof postUserSchema>;

export const putUserSchema = object({
  username: string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  email: string().email("Email tidak valid").required("Email wajib diisi"),
  firstName: string().required("First name wajib diisi"),
  lastName: string().optional(),
  phone: string().optional(),
  location: string().optional(),
});

export type PutUserBody = InferType<typeof putUserSchema>;

export const changePasswordSchema = object({
  currentPassword: string().required("Password lama wajib diisi"),
  newPassword: string()
    .required("Password baru wajib diisi")
    .min(8, "Password baru minimal 8 karakter"),
  confirmPassword: string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([ref("newPassword")], "Konfirmasi password tidak cocok"),
});

export type ChangePasswordBody = InferType<typeof changePasswordSchema>;
