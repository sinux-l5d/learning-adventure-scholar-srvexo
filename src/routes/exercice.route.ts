import { Router, RequestHandler } from 'express';
import { StrategieService } from '@services/strategie.service';
import { ExerciceService } from '@services/exercice.service';

const exerciceRouter = Router();

/**
 * Renvoie _un exercice en fonction des critères de recherche
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getExercicesWithFilters: RequestHandler = async (req, res, next) => {
  const filters = req.query;
  console.log(filters);
  ExerciceService.getExerciceWithFilters(filters)
    .then((exo) => {
      res.status(200).json({ exercice: exo });
    })
    .catch(next);
};

exerciceRouter.get('/one', getExercicesWithFilters);

/**
 * Renvoie un exercice d'après son ID
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 * @param next Function NextFunction d'Express. Fonction appelant le prochain middleware ou handleMiddlewareErrors si appellé avec un paramètre
 * @todo Voir si on peut se débarrasser de if (exo) aka le catch stop la fonction
 */
const getExerciceCompletById: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  ExerciceService.getExerciceCompletById(id)
    .then((exo) => {
      res.status(200).json({ exercice: exo });
    })
    .catch(next);
};

const getExerciceCompletNext: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  // Demander au service sratégie l'id de l'exercice suivant
  // Pour le moment pas de service stratégie donc codé en dur
  StrategieService.callStrategieForNextId(id)
    .then((idSuivant) => {
      return ExerciceService.getExerciceCompletById(idSuivant);
    })
    .then((exoSuivant) => {
      res.status(200).json({ exercice: exoSuivant });
    })
    .catch(next);
};

exerciceRouter.get('/:id', getExerciceCompletById);
exerciceRouter.get('/:id/next', getExerciceCompletNext);

/**
 * Renvoie tous les exercices de la db
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getAllExercicesWithFilters: RequestHandler = (req, res, next) => {
  const filters = req.query;
  console.log(filters);
  ExerciceService.getAllExercicesWithFilters(filters)
    .then((exo) => {
      res.status(200).json({ exercices: exo });
    })
    .catch(next);
};

exerciceRouter.get('/', getAllExercicesWithFilters);

export default exerciceRouter;
