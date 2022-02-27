import { AppError } from '@helpers/AppError.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import axios from 'axios';

/**
 * Service de gestion des appels au service stratégie
 */
export class StrategieService {
  /**
   *
   * @param id ID de l'exercice courant.
   * @returns L'id de l'exercice suivant
   * @throws Error si l'exercice n'a pas été trouvé
   */
  public static async callStrategieForNextId(
    id: ExerciceComplet['id'],
  ): Promise<ExerciceComplet['id']> {
    // Make a request for an exercice with a given ID
    try {
      const nextId = await axios.get(`${process.env.STRAT_URL}/next/${id}`);
      return nextId.data.next; // /next/:id renvoie {"next":"..."}
    } catch (err) {
      throw new AppError(`Not found: ${err}`, 404);
    }
  }
}
