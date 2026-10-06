import type { PostUserBody, PutUserBody } from "../schema/users.js";
import type { User } from "../types.js";
import { DatabaseError } from "../errors/appError.js";
import { query } from "../utils/pg.js";

export class UserRepository {
  static async getAllByName(nameQuery: string): Promise<User[]> {
    const sanitizedNameQuery = nameQuery.replace(/[%_]/g, "\\$&");

    const data = await query<User>(
      `SELECT
        id,
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        phone,
        location,
        profile_image AS "profileImage",
        email_verified AS "emailVerified",
        notifications_enabled AS "notificationsEnabled",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM auth.users
      WHERE concat(first_name, ' ', coalesce(last_name, ''))
      ILIKE $1`,
      [`%${sanitizedNameQuery}%`],
    );

    return data.rows;
  }

  static async getAll(): Promise<User[]> {
    const data = await query<User>(
      `SELECT
        id,
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        phone,
        location,
        profile_image AS "profileImage",
        email_verified AS "emailVerified",
        notifications_enabled AS "notificationsEnabled",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM auth.users
      ORDER BY id`,
    );

    return data.rows;
  }

  static async getOne(id: number): Promise<User | undefined> {
    const data = await query<User>(
      `SELECT
        id,
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        phone,
        location,
        profile_image AS "profileImage",
        email_verified AS "emailVerified",
        notifications_enabled AS "notificationsEnabled",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM auth.users
      WHERE id = $1`,
      [id],
    );

    return data.rows[0];
  }

  static async getPasswordById(id: number): Promise<string | undefined> {
    const data = await query<{ password: string }>(
      `SELECT password
       FROM auth.users
       WHERE id = $1`,
      [id],
    );

    return data.rows[0]?.password;
  }

  static async save({
    username,
    email,
    firstName,
    lastName,
    phone,
    location,
    password,
  }: PostUserBody): Promise<User> {
    const users = await query<User>(
      `INSERT INTO auth.users (
        username,
        first_name,
        last_name,
        email,
        phone,
        location,
        password
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        phone,
        location,
        profile_image AS "profileImage",
        email_verified AS "emailVerified",
        notifications_enabled AS "notificationsEnabled",
        created_at AS "createdAt",
        updated_at AS "updatedAt"`,
      [username, firstName, lastName, email, phone, location, password],
    );

    const user = users.rows[0];

    if (!user) {
      throw new DatabaseError(
        "Failed to create user",
        "User was not returned from insert",
      );
    }

    return user;
  }

  static async update(
    id: number,
    { username, email, firstName, lastName, phone, location }: PutUserBody,
  ): Promise<User> {
    const users = await query<User>(
      `UPDATE auth.users
       SET
         username = $1,
         first_name = $2,
         last_name = $3,
         email = $4,
         phone = $5,
         location = $6,
         updated_at = current_timestamp
       WHERE id = $7
       RETURNING
         id,
         username,
         first_name AS "firstName",
         last_name AS "lastName",
         email,
         phone,
         location,
         profile_image AS "profileImage",
         email_verified AS "emailVerified",
         notifications_enabled AS "notificationsEnabled",
         created_at AS "createdAt",
         updated_at AS "updatedAt"`,
      [username, firstName, lastName, email, phone, location, id],
    );

    const user = users.rows[0];

    if (!user) {
      throw new DatabaseError(
        "Failed to update user",
        "User was not returned from update",
      );
    }

    return user;
  }

  static async updatePassword(id: number, password: string): Promise<void> {
    const result = await query(
      `UPDATE auth.users
       SET
         password = $1,
         updated_at = current_timestamp
       WHERE id = $2`,
      [password, id],
    );

    if (result.rowCount === 0) {
      throw new DatabaseError(
        "Failed to update password",
        "User password was not updated",
      );
    }
  }

  static async delete(userId: number): Promise<void> {
    await query(
      `DELETE FROM auth.users
       WHERE id = $1`,
      [userId],
    );
  }
}
