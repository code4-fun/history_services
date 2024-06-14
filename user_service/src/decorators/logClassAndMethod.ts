import ApiError from "../error/apiError";

export function logClassAndMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      if (error instanceof ApiError) {
        error.className = target.constructor.name;
        error.methodName = propertyKey;
      }
      throw error;
    }
  };

  return descriptor;
}
