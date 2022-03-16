import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import * as repo from '@repositories/exercice.repo';
import { FilterQuery } from 'mongoose';

/**
 * Service de gestion des exercices
 */
export class ExerciceService {
  /**
   *
   * @param id ID de l'exercice rechercher.
   * @returns L'exercice dont l'id correspond au paramètre
   * @throws AppError si l'exercice n'a pas été trouvé
   */
  public static async getExerciceCompletById(id: ExerciceComplet['id']): Promise<ExerciceComplet> {
    return await repo.getExerciceCompletById(id);
  }

  /**
   * renvoie les exercices trouver ne fonction des filtres passés en parametre
   *
   * @param filters FilterQuery<ExerciceComplet> filtres utilisés pour la recherche d'exo
   * @returns Les exercices de la db
   * @throws Error si la bd est vide
   */
  public static async getAllExercicesWithFilters(
    filters: FilterQuery<ExerciceComplet>,
  ): Promise<ExerciceComplet[]> {
    return await repo.getAllExercicesWithFilters(filters);
  }

  /**
   *
   * @param filters FilterQuery<ExerciceComplet> filtres utilisés pour la recherche d'exo
   * @returns Les exercices de la db
   * @throws Error si la bd est vide
   */
  public static async getExerciceWithFilters(
    filters: FilterQuery<ExerciceComplet>,
  ): Promise<ExerciceComplet> {
    const tableauExo = await repo.getAllExercicesWithFilters(filters); // recupere les exercices en fonction des filtres
    const indiceExercice = Math.floor(Math.random() * tableauExo.length); // calcul un indice random entre 0 et tableauExo.length (tableauExo.length exclut)
    return tableauExo[indiceExercice];
  }

  /**
   *
   * @param exercicesRecolted JSON les exercices à insérer en bdd
   * @returns
   * @throws Error si erreur lors de l'insertion
   */
  public static async postNewExercices(exercicesRecolted: ExerciceComplet[]): Promise<void> {
    await repo.postNewExercices(exercicesRecolted);
    return;
  }
}
