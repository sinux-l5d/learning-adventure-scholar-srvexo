import { Router } from 'express';
import exerciceRouter from './exercice.route';

/**
 * Routeur global de l'application. Utilise les routeurs des ressources.
 */
const globalRouter = Router();

globalRouter.use('/exercices/', exerciceRouter);

export default globalRouter;
