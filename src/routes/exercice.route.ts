import { Router, RequestHandler } from 'express';
import { StrategieService } from '@services/strategie.service';
import { ExerciceService } from '@services/exercice.service';
import { FilterQuery } from 'mongoose';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import QueryString from 'qs';
import { ResultatService } from '@services/resultat.service';

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

/**
 * Renvoie l'exercice suivant à l'étudiant
 * Renvoie en même temps l'exercice au service résultat pour commencer l'analyse
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 * @param next Function NextFunction d'Express. Fonction appelant le prochain middleware ou handleMiddlewareErrors si appellé avec un paramètre
 */

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
      // une fois l'exercice envoyé à l'étudiant, les données sont envoyées au service résultat
      ResultatService.postExercicePourResultat(exoSuivant, 'etu', 'coursL3')
        .then((success) => {
          console.error(success);
        })
        .catch(next);
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
  const filters = convertFiltersExpressToMangoose(req.query);
  ExerciceService.getAllExercicesWithFilters(filters)
    .then((exo) => {
      res.status(200).json({ exercices: exo });
    })
    .catch(next);
};

/**
 * Convertit les filtres du format express au format mongoose
 * @param filters filtres au format d'express
 * @returns FilterQuery<ExerciceComplet> filtes au format mongoose
 */
function convertFiltersExpressToMangoose(filters: qs.ParsedQs): FilterQuery<ExerciceComplet> {
  for (const key in filters) {
    if (filters[key] instanceof Array) {
      filters[key] = { $all: filters[key] };
    }
  }
  return filters;
}

exerciceRouter.get('/', getAllExercicesWithFilters);

export default exerciceRouter;
