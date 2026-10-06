import { Router } from "express";

import { upload } from "../middlewares/upload.js";
import { uploadImage } from "../controllers/images.controller.js";

export const imageRouter = Router();

imageRouter.post("/", upload.single("image"), uploadImage);
