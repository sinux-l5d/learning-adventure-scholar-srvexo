import express from 'express';
import { handleAppErrors, handleMiddlewareErrors } from './middlewares/error.middleware';
import globalRouter from './routes';

/**
 * Application express gérant les appelles aux fonctions en fonction du chemin
 */
const app = express();

app.use(express.json());

// Doit être avant l'application (globalRouter)
app.use(handleAppErrors);

// Désactive le header indiquant que c'est une application express
app.disable('x-powered-by');

app.use(globalRouter);

// Doit être en dernier
app.use(handleMiddlewareErrors);

/**
 * Application hydraté avec tout les middlewares
 */
export default app;
