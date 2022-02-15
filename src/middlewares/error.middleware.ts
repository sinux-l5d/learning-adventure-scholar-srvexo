import { ErrorRequestHandler, RequestHandler } from 'express';
import { send } from 'process';
import { envDependent } from 'src/helpers/env.helper';

export const handleMiddlewareErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(envDependent(err, err.stack));
  res.status(500).json({ error: envDependent('Internal Server Error', err) });
};

export const handleAppErrors: RequestHandler = (req, res, next) => {
  try {
    next();
  } catch (e) {
    res.status(500);
    if (typeof e === 'string') {
      res.send({ error: e.toUpperCase() });
    } else if (e instanceof Error) {
      res.send({ error: e.message });
    } else {
      res.send({ error: e + '' });
    }
  }
};
