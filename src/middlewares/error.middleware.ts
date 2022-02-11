import { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    if (process.env.NODE_ENV === 'production') {
      // production
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // développement
      console.error(err.stack);
      res.status(500).json({ error: err });
    }
  }
};
