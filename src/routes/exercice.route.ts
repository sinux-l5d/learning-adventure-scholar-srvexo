import { Router, RequestHandler } from 'express';
import { ExerciceService } from 'src/services/exercice.service';
import { StrategieService } from 'src/services/strategie.service';

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

const getExerciceCompletNext: RequestHandler = async (req, res) => {
  const id = req.params.id;
  // Demander au service sratégie l'id de l'exercice suivant
  // Pour le moment pas de service stratégie donc codé en dur
  const idSuivant = await StrategieService.callStrategieForNextId(id);
  const exoSuivant = await ExerciceService.getExerciceCompletById(idSuivant);
  res.status(200).json({ exercice: exoSuivant });
};

exerciceRouter.get('/:id', getExerciceCompletById);
exerciceRouter.get('/:id/next', getExerciceCompletNext);

export default exerciceRouter;
