import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { query } from "../utils/pg.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
      passwordField: "password",
    },
    async (identifier, password, done) => {
      try {
        const result = await query(
          `
          select
            id,
            username,
            first_name as "firstName",
            last_name as "lastName",
            email,
            password,
            phone,
            location,
            profile_image as "profileImage",
            email_verified as "emailVerified",
            notifications_enabled as "notificationsEnabled"
          from auth.users
          where username = $1
             or email = $1
          limit 1
          `,
          [identifier],
        );

        if (result.rows.length === 0) {
          return done(null, false, {
            message: "Username atau email tidak ditemukan",
          });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, {
            message: "Password salah",
          });
        }

        delete user.password;

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
