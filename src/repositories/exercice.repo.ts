import { Exercice } from '@db/exercice.db';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';

/**
 * @todo filtrer les attributs de l'exercice qui ne servent pas (attributs spécifiques à BDD) (Document & Exo & _id -> Exo)
 */
export const getExerciceCompletById = async (
  id: ExerciceComplet['id'],
): Promise<ExerciceComplet> => {
  const exo = await Exercice.findById(id).exec();
  if (exo) {
    return exo;
  }
  throw new Error('Not found'); // @todo : handle
};
