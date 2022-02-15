import { Exercice } from '@db/exercice.db';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { FilterQuery } from 'mongoose';

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
  throw new Error('getExerciceCompletById: Exercice not found');
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
  throw new Error('getAllExercicesWithFilters: exercices not found');
};
