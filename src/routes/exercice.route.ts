import { Router, RequestHandler } from 'express';
import { ExerciceService } from '@services/exercice.service';

const exerciceRouter = Router();

/**
 * Renvoie un exercice d'après son ID
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 * @param next Function NextFunction d'Express. Fonction appelant le prochain middleware ou handleMiddlewareErrors si appellé avec un paramètre
 * @todo Voir si on peut se débarasser de if (exo) aka le catch stop la fonction
 */
const getExerciceCompletById: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  ExerciceService.getExerciceCompletById(id)
    .then((exo) => {
      res.status(200).json({ exercice: exo });
    })
    .catch(next);
};

exerciceRouter.get('/:id', getExerciceCompletById);

/**
 * Renvoie tous les exercices de la db
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getAllExercicesWithFilters: RequestHandler = (req, res, next) => {
  const filters = req.query;
  ExerciceService.getAllExercicesWithFilters(filters)
    .then((exo) => {
      res.status(200).json({ all: exo });
    })
    .catch(next);
};

exerciceRouter.get('/', getAllExercicesWithFilters);

/**
 * Renvoie _un exercice en fonction des critères de recherche
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getExercicesWithFilters: RequestHandler = async (req, res) => {
  const filters = req.query;
  console.log(filters);
  const exo = await ExerciceService.getExerciceWithFilters(filters);
  res.status(200).json({ exercice: exo });
};

exerciceRouter.get('/one/filtre', getExercicesWithFilters);

export default exerciceRouter;
