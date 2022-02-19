import { AppError } from '@helpers/AppError.helper';
import { ErrorRequestHandler } from 'express';
import { envDependent } from 'src/helpers/env.helper';

export const handleMiddlewareErrors: ErrorRequestHandler = (err: AppError, req, res, next) => {
  console.error(envDependent(err, err.stack ?? 'Pas de stack'));
  res
    .status(err.status)
    .json({ error: envDependent('Internal Server Error', err.message?.toString()) });
};
