import express from 'express';
import { errorHandlerMiddleware } from './middlewares/error.middleware';
import globalRouter from './routes';

/**
 * Application express gérant les appelles aux fonctions en fonction du chemin
 */
const app = express();

app.use(express.json());

// Désactive le header indiquant que c'est une application express
app.disable('x-powered-by');

app.use(globalRouter);

// Doit être en dernier
app.use(errorHandlerMiddleware);

/**
 * Application hydraté avec tout les middlewares
 */
export default app;
