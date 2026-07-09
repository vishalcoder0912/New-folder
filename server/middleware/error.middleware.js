export const notFound = (req, _res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 422 : 500);
  const errors = err.name === 'ValidationError'
    ? Object.values(err.errors).map((item) => item.message)
    : null;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    errors
  });
};
