import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { AppError, DatabaseError } from "../errors/appError.js";

const formatYupError = (error: ValidationError) => {
  const detailsSource = error.inner.length > 0 ? error.inner : [error];

  const errors = detailsSource.map((item) => ({
    field: item.path ?? "root",
    message: item.message,
    type: item.type ?? "validation_error",
  }));

  return errors;
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404, "Not Found"));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      data: formatYupError(error),
    });
  }

  if (error instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      data: error.payload,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      data: error.payload,
    });
  }

  return res.status(500).json({
    success: false,
    data: "Internal Server Error",
  });
};
