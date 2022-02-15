import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import * as repo from '@repositories/exercice.repo';

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
   *
   * @returns Les exercices de la db
   * @throws Error si la bd est vide
   */
  public static async getAllExercices(): Promise<ExerciceComplet[]> {
    return await repo.getAllExercices();
  }
}
