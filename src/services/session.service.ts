import { AppError } from '@helpers/AppError.helper';
import * as repo from '@repositories/session.repo';
import { SessionComplet } from '@type/session/SessionComplet';
import { ExerciceService } from './exercice.service';

export class SessionService {
  /**
   * Renvoie une session par son identifiant.
   * @param id L'identifiant de la session que vous souhaitez obtenir
   * @param populate Remplacer les ID par des objets exercices
   * @returns Une session
   */
  public static async getSessionById(id: string, populate = false): Promise<SessionComplet> {
    return await repo.getSessionById(id, populate);
  }

  /**
   * Il renvoie toutes les sessions de la base de données.
   * @param populate Remplacer les ID par des objets exercices
   * @returns Un tableau de sessions
   */
  public static async getAllSessions(populate = false): Promise<SessionComplet[]> {
    return await repo.getAllSessions(populate);
  }

  /**
   * Ajoute une session à la base de données.
   * @param session La session à ajouter
   * @returns La session ajoutée
   * @throws AppError si l'ID d'un exercice n'existe pas
   */
  public static async addSession(session: SessionComplet): Promise<SessionComplet> {
    const exercices = session.exercices;

    for (const id of exercices)
      if (!(await ExerciceService.exist(id)))
        throw new AppError(`L'exercice ${id} n'existe pas`, 404);

    return await repo.addSession(session);
  }
}
