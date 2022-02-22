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
   * @returns L'exercice demandé
   * @throws Error si l'exercice n'a pas été trouvé
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
}
