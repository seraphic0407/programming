import { Router } from "express";
import passport from "passport";
import type { Request, Response, NextFunction } from "express";

type LoginInfo = {
  message?: string;
};

export const authRouter = Router();

authRouter.post(
  "/login/password",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: unknown,
        user: Express.User | false | null | undefined,
        info: LoginInfo | undefined,
      ) => {
        console.log("=== PASSPORT LOGIN ===");
        console.log("error:", err);
        console.log("user:", user);
        console.log("info:", info);

        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: info?.message ?? "Username atau password salah",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Login berhasil",
          data: user,
        });
      },
    )(req, res, next);
  },
);
