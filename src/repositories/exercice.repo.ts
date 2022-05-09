import { Exercice } from '@db/exercice.db';
import { AppError } from '@helpers/AppError.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { FilterQuery } from 'mongoose';
import { envDependent } from '@helpers/env.helper';

/**
 * Renvoie un exercice en fonction de son ID.
 *
 * @throws Error si l'exercice n'a pas été trouvé.
 */
export const getExerciceCompletById = async (
  id: ExerciceComplet['id'],
): Promise<ExerciceComplet> => {
  let exo;

  // renvoie null si l'exo n'est pas trouvé.
  // throw une exeption si le format de l'ID n'est pas bon
  try {
    exo = await Exercice.findById(id).exec();
  } catch {
    throw new AppError(envDependent('', 'getExerciceCompletById: ') + "Mauvais format d'ID", 400);
  }

  if (!exo)
    throw new AppError(envDependent('', 'getExerciceCompletById: ') + 'Exercice non trouvé', 404);

  return exo;
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
  if (exercices && exercices.length != 0) {
    return exercices;
  }
  throw new AppError(
    envDependent('', 'getAllExercicesWithFilters: ') + 'Exercices non trouvé',
    404,
  );
};

/**
 * Insère un exercice dans la bdd
 *
 * @throws Error s'il se produit une erreur lors de l'insertion dans la bdd (mauvais paramètres, erreur de connexion à la bdd, etc.)
 * @param exercicesRecolted JSON les exercices à insérer dans la bdd
 * @returns
 */
export const postNewExercices = async (
  exercicesRecolted: ExerciceComplet[],
): Promise<ExerciceComplet[]> => {
  try {
    return await Exercice.create(exercicesRecolted);
  } catch (error) {
    throw new AppError(
      envDependent('', 'postNewExercice: ') +
        'Error during the insertion of a new exercice : ' +
        error,
      404,
    );
  }
};
