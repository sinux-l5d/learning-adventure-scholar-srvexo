import { AppError } from '@helpers/AppError.helper';
import { handleSeanceHeader, handleUserHeader } from '@middlewares/user.middleware';
import { ExecutionService } from '@services/execution.service';
import { ResultatService } from '@services/resultat.service';
import { SessionService } from '@services/session.service';
import { SeanceReq, SessionReq } from '@type/session/SessionReq';
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

/**
 * Recupere l'exercice suivant selon la strategie donnée et envoie au service résultat l'exercice
 * commencé par l'étudiant
 */
const getNextExerciceOfSession: RequestHandler = (req, res, next) => {
  const idSession = req.params.idSession;
  const idExercice = req.params.idExercice;

  // req.seance est défini par le middleware handleSeanceHeader, on force le type à non null
  SessionService.seanceInSession(idSession, req.seance!)
    .then((valide) => {
      if (!valide) {
        throw new AppError(
          `La séance '${req.seance}' (en header) n'est pas dans la session '${idSession}'`,
          400,
        );
      }
    })
    .then(() => {
      SessionService.getNextExerciceOfSession(idSession, idExercice, req.seance!)
        .then((exerciceSuivant) => {
          res.status(200).json({ exerciceSuivant });

          // dernier exercice, pas d'envoie à résultat car pas de nouvelle exercice.
          if (!exerciceSuivant) return;

          // Une fois l'exercice envoyé à l'étudiant, les données sont envoyées au service résultat
          // req.user et req.seance sont défini par le middleware handleUserHeader, on force le type à non null
          ResultatService.postExercicePourResultat(
            exerciceSuivant,
            req.user!,
            idSession,
            req.seance!,
          )
            .then((success) => {
              console.log(success);
            })
            .catch(console.error);
        })
        .catch(next);
    })
    .catch(next);
};

const modifierSeance: RequestHandler = (req, res, next) => {
  const idSession = req.params.idSession;
  const idSeance = req.params.idSeance;

  const seance: SeanceReq = req.body;

  SessionService.modifierSeance(idSession, idSeance, seance)
    .then((session) => {
      res.status(200).json({ session });
    })
    .catch(next);
};

const addTentative: RequestHandler = (req, res, next) => {
  const idSession = req.params.idSession;
  const idExercice = req.params.idExercice;

  // @TODO: VERIFIER SI DROIT DE SOUMETTRE
  // req.seance est défini par le middleware handleSeanceHeader, on force le type à non null
  SessionService.seanceInSession(idSession, req.seance!)
    .then((valide) => {
      if (!valide) {
        throw new AppError(
          `La séance '${req.seance}' (en header) n'est pas dans la session '${idSession}'`,
          400,
        );
      }
    })
    .then(() => {
      SessionService.seanceOuverte(idSession, req.seance!)
        .then(({ open, error }) => {
          if (!open) {
            throw error;
          }
          ExecutionService.execute(req.body.reponse, idExercice)
            .then((resp) => {
              res.status(resp.statusCode).json(resp);
              // notifier le service résultat
              ResultatService.postTentativePourResultat(
                req.user!,
                idExercice,
                idSession,
                req.body.reponse,
                resp.output,
                resp.status,
              );
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const sessionRouter = Router();
sessionRouter.get(
  '/:idSession/exercices/:idExercice/next',
  handleUserHeader,
  handleSeanceHeader,
  getNextExerciceOfSession,
);
sessionRouter.post(
  '/:idSession/exercices/:idExercice/tentative',
  handleUserHeader,
  handleSeanceHeader,
  addTentative,
);
sessionRouter.put('/:idSession/seances/:idSeance', modifierSeance);
sessionRouter.get('/:id/exercices', getExercicesOfSession);
sessionRouter.get('/:id', getSessionById);
sessionRouter.get('/', getAllSessions);
sessionRouter.post('/', addSession);

export default sessionRouter;
