import { SessionService } from '@services/session.service';
import { RequestHandler, Router } from 'express';

/**
 * Obtient toutes les sessions de la base de données, et si le paramètre de requête "populate" est
 * défini sur "true", remplace les ID des exercices par des objets exercices.
 */
const getAllSessions: RequestHandler = (req, res, next) => {
  const populate = req.query.populate + '' === 'true';
  SessionService.getAllSessions(populate)
    .then((sessions) => {
      res.status(200).json({ sessions });
    })
    .catch(next);
};

/**
 * Il obtient une session par identifiant, et si le paramètre de requête "populate" est défini sur
 * "true", remplace les ID des exercices par des objets exercices.
 */
const getSessionById: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const populate = req.query.populate + '' === 'true';
  SessionService.getSessionById(id, populate)
    .then((session) => {
      res.status(200).json({ session });
    })
    .catch(next);
};

const sessionRouter = Router();
sessionRouter.get('/:id', getSessionById);
sessionRouter.get('/', getAllSessions);

export default sessionRouter;
