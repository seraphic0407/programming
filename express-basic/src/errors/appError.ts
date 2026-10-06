export class AppError extends Error {
  public readonly statusCode: number;
  public readonly payload: unknown;

  constructor(message: string, statusCode = 500, payload?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.payload = payload ?? message;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, payload?: unknown) {
    super(message, 400, payload);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, payload?: unknown) {
    super(message, 404, payload);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, payload?: unknown) {
    super(message, 500, payload);
  }
}
