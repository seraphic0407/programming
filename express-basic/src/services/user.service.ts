import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import type {
  PostUserBody,
  PutUserBody,
  ChangePasswordBody,
} from "../schema/users.js";
import type { User } from "../types.js";

export class UserService {
  static async getAllUsers(nameQuery?: string): Promise<User[]> {
    if (nameQuery) {
      return UserRepository.getAllByName(nameQuery);
    }

    return UserRepository.getAll();
  }

  static async getOneUsers(id: string): Promise<User | undefined> {
    return UserRepository.getOne(Number(id));
  }

  static async createUsers(data: PostUserBody): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return UserRepository.save({
      ...data,
      password: hashedPassword,
    });
  }

  static async updateUsers(id: string, data: PutUserBody): Promise<User> {
    return UserRepository.update(Number(id), data);
  }

  static async changePassword(
    id: string,
    data: ChangePasswordBody,
  ): Promise<void> {
    const userId = Number(id);
    const currentPassword = await UserRepository.getPasswordById(userId);

    if (!currentPassword) {
      throw new Error("User tidak ditemukan");
    }

    const passwordValid = await bcrypt.compare(
      data.currentPassword,
      currentPassword,
    );

    if (!passwordValid) {
      throw new Error("Password saat ini salah");
    }

    const samePassword = await bcrypt.compare(
      data.newPassword,
      currentPassword,
    );

    if (samePassword) {
      throw new Error("Password baru tidak boleh sama dengan password lama");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await UserRepository.updatePassword(userId, hashedPassword);
  }

  static async deleteUsers(id: string): Promise<void> {
    await UserRepository.delete(Number(id));
  }
}
