import { useState } from "react";
import { login } from "../service/auth.service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const user = await login(identifier, password);

      return user;
    } catch (error) {
      console.error("Login gagal:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login gagal.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loginUser,
  };
};
