import * as repo from '@repositories/session.repo';
import { SessionComplet } from '@type/session/SessionComplet';

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
}
