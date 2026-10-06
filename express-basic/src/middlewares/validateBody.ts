import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "yup";

export const validateBody = <T extends object>(schema: ObjectSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      return next();
    } catch (error) {
      return next(error);
    }
  };
};
