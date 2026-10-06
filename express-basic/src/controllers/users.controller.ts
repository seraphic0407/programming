import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import type {
  PostUserBody,
  PutUserBody,
  ChangePasswordBody,
} from "../schema/users.js";
import type { HttpResponse, User } from "../types.js";

export class UserController {
  static async GET_ALL(
    req: Request<unknown, unknown, unknown, { name?: string }>,
    res: Response<HttpResponse<User[]>>,
  ) {
    const nameQuery = req.query.name;

    const users = await UserService.getAllUsers(nameQuery);

    res.status(200).json({
      success: true,
      data: users,
    });
  }

  static async GET_ONE(
    req: Request<{ id: string }>,
    res: Response<HttpResponse<User>>,
  ) {
    const user = await UserService.getOneUsers(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  static async POST(
    req: Request<unknown, unknown, PostUserBody>,
    res: Response<HttpResponse<User>>,
  ) {
    const user = await UserService.createUsers(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }

  static async PUT(
    req: Request<{ id: string }, unknown, PutUserBody>,
    res: Response<HttpResponse<User>>,
  ) {
    const user = await UserService.updateUsers(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  static async CHANGE_PASSWORD(
    req: Request<{ id: string }, unknown, ChangePasswordBody>,
    res: Response<HttpResponse<undefined>>,
  ) {
    await UserService.changePassword(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Password berhasil diubah",
    });
  }

  static async DELETE(
    req: Request<{ id: string }>,
    res: Response<HttpResponse<undefined>>,
  ) {
    await UserService.deleteUsers(req.params.id);

    res.status(200).json({
      success: true,
      message: "User berhasil dihapus",
    });
  }
}
