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

export default exerciceRouter;
