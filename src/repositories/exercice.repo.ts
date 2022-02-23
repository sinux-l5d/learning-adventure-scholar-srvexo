import { Exercice } from '@db/exercice.db';
import { AppError } from '@helpers/AppError.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';

/**
 * Renvoie un exercice en fonction de son ID.
 *
 * @throws Error si l'exercice n'a pas été trouvé.
 * @todo filtrer les attributs de l'exercice qui ne servent pas (attributs spécifiques à BDD) (Document & Exo & _id -> Exo)
 * @todo gérer erreurs
 * @simplifié façon de renvoyer et généraliser
 */
export const getExerciceCompletById = async (
  id: ExerciceComplet['id'],
): Promise<ExerciceComplet> => {
  const exo = await Exercice.findById(id).exec();
  if (exo) {
    return exo;
  }
  throw new AppError("L'utilisateur n'existe pas", 404);
};
