export const requestDecorator = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalRequest = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalRequest.apply(this, args);
        return result;
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    };
  };
};
