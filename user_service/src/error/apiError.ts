import { ValidationError } from "class-validator";

class ApiError extends Error {
  public status: number;
  public className?: string;
  public methodName?: string;
  public errors?: ValidationError[];

  constructor(
    status: number,
    message: string,
    errors?: ValidationError[],
    className?: string,
    methodName?: string
  ) {
    super(message);
    this.status = status;
    this.className = className;
    this.methodName = methodName;
    if (errors != undefined) {
      this.errors = errors;
    }
  }

  static badRequest(message: string, errors: ValidationError[]) {
    return new ApiError(400, message || 'Request cannot be processed', errors)
  }

  static notFound(message: string) {
    return new ApiError(404, message || 'Not found');
  }
}

export default ApiError
