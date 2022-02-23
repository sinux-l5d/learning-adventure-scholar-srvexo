import { Exercice } from '@db/exercice.db';
import { AppError } from '@helpers/AppError.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { FilterQuery } from 'mongoose';
import { envDependent } from '@helpers/env.helper';

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
  // utilisation de envDependent pour modifier les erreurs en fonction du dev ou de la prod
  throw new AppError(envDependent('', 'getExerciceCompletById: ') + 'Exercice not found', 404);
};

/**
 * Renvoie tous les exercices correspondants aux paramètres
 *
 * @param filters FilterQuery<ExerciceComplet> filtres utilisés dans la recherche des exercices correspondant
 * @throws Error si aucun exercice n'est trouvé dans la BDD
 * @return ExerciceComplet[] la liste des exercices récupérés
 */
export const getAllExercicesWithFilters = async (
  filters: FilterQuery<ExerciceComplet>,
): Promise<ExerciceComplet[]> => {
  const exercices = await Exercice.find(filters).exec();
  if (exercices) {
    return exercices;
  }
  throw new AppError(envDependent('', 'getAllExercicesWithFilters: ') + 'Exercices not found', 404);
};
