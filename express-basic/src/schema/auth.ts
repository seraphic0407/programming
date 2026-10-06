import { object, string, type InferType } from "yup";

export const loginSchema = object({
  identifier: string().required("Username atau email wajib diisi"),
  password: string().required("Password wajib diisi"),
});

export type LoginBody = InferType<typeof loginSchema>;
