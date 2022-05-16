import config from '@config';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { SessionComplet } from '@type/session/SessionComplet';
import axios from 'axios';
import { ExerciceService } from './exercice.service';

/**
 * Service de gestion des appels au service stratégie
 * @throws Error si le service stratégie n'est pas accessible
 */
export class StrategieService {
  /**
   *
   * @param id ID de l'exercice courant.
   * @returns L'exercice suivant
   * @throws Error si l'exercice n'a pas été trouvé
   */
  public static async getNextExercice(
    strategie: SessionComplet['strategie'],
    exercices: ExerciceComplet[],
    exerciceCourant?: ExerciceComplet['id'],
  ): Promise<ExerciceComplet | undefined> {
    // Make a request for an exercice with a given ID
    try {
      const nextIdResponse = await axios.post(`${config.STRAT_URL}/next`, {
        strategie,
        exercices,
        exerciceCourant,
      });

      if (!nextIdResponse.data.id) return Promise.resolve(undefined);

      return await ExerciceService.getExerciceCompletById(nextIdResponse.data.id);
    } catch (err) {
      throw new AppError(
        envDependent('', 'getNextExercice: ') + 'Service stratégie inaccéssible',
        500,
      );
    }
  }
}
