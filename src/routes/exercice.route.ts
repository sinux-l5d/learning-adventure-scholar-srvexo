import { Router, RequestHandler } from 'express';
import { ExerciceService } from 'src/services/exercice.service';

const exerciceRouter = Router();

/**
 * Renvoie un exercice d'après son ID
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 * @param next Function NextFunction d'Express. Fonction appelant le prochain middleware ou handleMiddlewareErrors si appellé avec un paramètre
 * @todo Voir si on peut se débarasser de if (exo) aka le catch stop la fonction
 */
const getExerciceCompletById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  ExerciceService.getExerciceCompletById(id)
    .then((exo) => {
      res.status(200).json({ exercice: exo });
    })
    .catch(next);
};

exerciceRouter.get('/:id', getExerciceCompletById);

export default exerciceRouter;
