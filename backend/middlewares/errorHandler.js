// const errorHandler = (err, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let message = err.message || 'Internal Server Error';

//   if (err.name === 'CastError' && err.kind === 'ObjectId') {
//     statusCode = 404;
//     message = 'Resource not found';
//   }

//   if (err.code === 11000) {
//     statusCode = 400;
//     message = 'Duplicate field value entered';
//   }

//   if (err.name === 'ValidationError') {
//     statusCode = 400;
//     message = Object.values(err.errors).map((val) => val.message).join(', ');
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// };

// export default errorHandler;

// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error('Captured Error:', err);

  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose CastError (Bad ObjectId)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'email';
    message = `An account with this ${field} already exists.`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Not authorized, invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, token has expired';
  }

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;