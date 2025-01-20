const globalErrorHandler = (err, req, res, next) => {
  // Default values for status code and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err.statusCode = 404;
  }
  // Log the error for debugging
  console.error("ERROR 💥:", err);

  // Send response to the client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace in development
  });
};

export default globalErrorHandler;
