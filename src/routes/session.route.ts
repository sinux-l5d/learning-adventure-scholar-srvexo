import { ResultatService } from '@services/resultat.service';
import { SessionService } from '@services/session.service';
import { SessionReq } from '@type/session/SessionReq';
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

/**
 * Ajouter une session à la base de données.
 */
const addSession: RequestHandler = (req, res, next) => {
  const session: SessionReq = req.body;
  const populate = req.query.populate + '' === 'true';
  SessionService.addSession(session, populate)
    .then((session) => {
      res.status(200).json({ session });
    })
    .catch(next);
};

/**
 * Recupere les exercices d'un session donnée
 */
const getExercicesOfSession: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const populate = req.query.populate + '' === 'true';
  SessionService.getExercicesOfSession(id, populate)
    .then((exercices) => {
      res.status(200).json({ exercices });
    })
    .catch(next);
};

const getNextExerciceOfSession: RequestHandler = (req, res, next) => {
  const idSession = req.params.idSession;
  const idExercice = req.params.idExercice;

  SessionService.getNextExerciceOfSession(idSession, idExercice)
    .then((exerciceSuivant) => {
      res.status(200).json({ exerciceSuivant });

      if (!exerciceSuivant) return;

      // Une fois l'exercice envoyé à l'étudiant, les données sont envoyées au service résultat
      // TODO: Gerer l'id des etudiant avec adresse mail/nom prenom
      ResultatService.postExercicePourResultat(exerciceSuivant, 'etu', idSession)
        .then((success) => {
          console.log(success);
        })
        .catch(console.error);
    })
    .catch(next);
};

const sessionRouter = Router();
sessionRouter.get('/:idSession/exercices/:idExercice/next', getNextExerciceOfSession);
sessionRouter.get('/:id/exercices', getExercicesOfSession);
sessionRouter.get('/:id', getSessionById);
sessionRouter.get('/', getAllSessions);
sessionRouter.post('/', addSession);

export default sessionRouter;
