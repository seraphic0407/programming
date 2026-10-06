import { Router } from "express";

import { userRouter } from "./users.js";
import { authRouter } from "./auth.js";
import { eventRouter } from "./events.js";
import { imageRouter } from "./images.js";

export const router = Router();

router.use("/users", userRouter);

router.use("/auth", authRouter);

router.use("/events", eventRouter);

router.use("/images", imageRouter);
