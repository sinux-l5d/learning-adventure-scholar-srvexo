import { Router, RequestHandler } from 'express';
import { ExerciceService } from 'src/services/exercice.service';

const exerciceRouter = Router();

/**
 * Renvoie un exercice d'après son ID
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getExerciceCompletById: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const exo = await ExerciceService.getExerciceCompletById(id);
  res.status(200).json({ exercice: exo });
};

exerciceRouter.get('/:id', getExerciceCompletById);

/**
 * Renvoie tous les exercices de la db
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const getAllExercicesWithFilters: RequestHandler = async (req, res) => {
  const filters = req.query;
  console.log(filters);
  const exo = await ExerciceService.getAllExercicesWithFilters(filters);
  res.status(200).json({ all: exo });
};

exerciceRouter.get('/', getAllExercicesWithFilters);

export default exerciceRouter;
