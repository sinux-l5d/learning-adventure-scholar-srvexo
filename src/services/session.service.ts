import { AppError } from '@helpers/AppError.helper';
import * as repo from '@repositories/session.repo';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { SessionComplet } from '@type/session/SessionComplet';
import { SessionReq } from '@type/session/SessionReq';
import { ExerciceService } from './exercice.service';
import { StrategieService } from './strategie.service';

export class SessionService {
  /**
   * Renvoie une session par son identifiant.
   * @param id L'identifiant de la session que vous souhaitez obtenir
   * @param populate Remplacer les ID par des objets exercices
   * @returns Une session
   */
  public static async getSessionById(
    id: SessionComplet['id'],
    populate = false,
  ): Promise<SessionComplet> {
    return await repo.getSessionById(id, populate);
  }

  /**
   * Cette fonction renvoie un tableau d'exercices d'une séance, soit sous forme de tableau d'ID, soit sous forme de
   * tableau d'ExercicesComplet
   * @param id L'id de la session a récu
   * @param populate Remplacer les ID par des objets exercices
   */
  public static async getExercicesOfSession<B extends boolean>(
    id: SessionComplet['id'],
    populate: B,
  ): Promise<B extends true ? ExerciceComplet[] : string[]> {
    const session = await SessionService.getSessionById(id, populate);

    return session.exercices as B extends true ? ExerciceComplet[] : string[];
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
  public static async addSession(session: SessionReq, populate = false): Promise<SessionComplet> {
    const exercices = session.exercices;

    for (const id of exercices)
      if (!(await ExerciceService.exist(id)))
        throw new AppError(`L'exercice ${id} n'existe pas`, 404);

    return await repo.addSession(session, populate);
  }

  public static async getNextExerciceOfSession(
    idSession: SessionComplet['id'],
    idExercice: ExerciceComplet['id'] | 'init',
  ): Promise<ExerciceComplet> {
    const session = await SessionService.getSessionById(idSession, true);
    const strategie = session.strategie;
    const exercices = session.exercices as ExerciceComplet[];

    let found = false;
    for (const exo of exercices) {
      if (exo.id === idExercice) {
        found = true;
        break;
      }
    }

    if (!found && idExercice !== 'init')
      throw new AppError(`L'exercice ${idExercice} n'est pas dans la session ${idSession}`, 404);

    const nextExo: ExerciceComplet = await StrategieService.getNextExercice(
      strategie,
      exercices,
      idExercice === 'init' ? undefined : idExercice,
    );

    return nextExo;
  }
}
