export const errorHandler = (statusCodes, message) => {
    const error = new Error(message);
    error.statusCode = statusCodes;
    error.message = message;
    return error;
  };