import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/customError';
import { log } from '../utils/logger';

// Error handler middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // If it's a custom error, handle it
  if (err instanceof CustomError) {
    log(`Custom error occurred: ${err.message} (Status: ${err.statusCode})`);
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // error handler for all other errors
  log(`Unexpected error occurred: ${err.message}`);
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
};

