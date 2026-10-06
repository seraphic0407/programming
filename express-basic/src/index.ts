import "dotenv/config";
import path from "node:path";

import express, { type Express } from "express";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import db from "./utils/pg.js";
import helmet from "helmet";
import { router } from "./routes/index.js";
import { logger, requestLogger } from "./utils/logger.js";
import cors from "cors";
import passport from "./config/passport.js";

const main = async () => {
  const app: Express = express();
  const protocol = process.env.APP_PROTOCOL ?? "http";
  const host = process.env.APP_HOST ?? "localhost";
  const port = process.env.APP_PORT ?? "3000";

  await db.connect();
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
    }),
  );
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.resolve("uploads")));

  app.use("/api/v1", router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => {
    logger.info(`Server running on ${protocol}://${host}:${port}`);
  });
};

void main();
