import morgan from "morgan";
import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const output = stack ?? message;
      return `${timestamp} [${level}]: ${output}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export const requestLogger = morgan(
  '":method :url" :status ":user-agent" :response-time ms',
  {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  },
);
