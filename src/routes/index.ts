import { Router } from 'express';
import exerciceRouter from './exercice.route';
import sessionRouter from './session.route';

/**
 * Routeur global de l'application. Utilise les routeurs des ressources.
 */
const globalRouter = Router();

globalRouter.use('/exercices', exerciceRouter);
globalRouter.use('/sessions', sessionRouter);

export default globalRouter;
