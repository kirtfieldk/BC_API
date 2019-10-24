const ErrorResponse = require('../util/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Log to console
  if (err.name === 'CastError') {
    const message = `Cannot fetch from database: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //   Validation err
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => {
      val.message;
    });
    error = new ErrorResponse(message, 400);
  }
  //   MOngo duplicate key
  if (err.code === 11000) {
    const message = `Duplicate Field Value`;
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    msg: 'Failure',
    error: error.message || 'Server error'
  });
};
module.exports = errorHandler;
