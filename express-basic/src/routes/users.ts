import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  postUserSchema,
  putUserSchema,
  changePasswordSchema,
} from "../schema/users.js";
import { UserController } from "../controllers/users.controller.js";

export const userRouter = Router();

userRouter.get("", UserController.GET_ALL);

userRouter.get("/:id", UserController.GET_ONE);

userRouter.post("", validateBody(postUserSchema), UserController.POST);

userRouter.put(
  "/:id/password",
  validateBody(changePasswordSchema),
  UserController.CHANGE_PASSWORD,
);

userRouter.put("/:id", validateBody(putUserSchema), UserController.PUT);

userRouter.delete("/:id", UserController.DELETE);
