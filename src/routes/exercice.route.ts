import { Router, RequestHandler } from 'express';
import { ExerciceService } from '@services/exercice.service';
import { convertFiltersExpressToMangoose } from '@helpers/convertFiltersExpressToMangoose';

/**
 * Renvoie _un exercice en fonction des critères de recherche
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getExercicesWithFilters: RequestHandler = async (req, res, next) => {
  const filters = convertFiltersExpressToMangoose(req.query);
  ExerciceService.getExerciceWithFilters(filters)
    .then((exo) => {
      res.status(200).json({ exercice: exo });
    })
    .catch(next);
};

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
 * Rajoute une liste d'exercices à la bdd
 *
 * @param req Objet Request d'Express -> req.body sous la forme de ExerciceComplet[]
 * @param res Object Response d'Express
 * @param next
 */
const postNewExercices: RequestHandler = (req, res, next) => {
  const exercicesRecolted = req.body;
  ExerciceService.postNewExercices(exercicesRecolted)
    .then((value) => {
      res.status(200).json(value);
    })
    .catch(next);
};

const exerciceRouter = Router();
exerciceRouter.get('/one', getExercicesWithFilters);
exerciceRouter.get('/:id', getExerciceCompletById);
exerciceRouter.get('/', getAllExercicesWithFilters);
exerciceRouter.post('/', postNewExercices);

export default exerciceRouter;
