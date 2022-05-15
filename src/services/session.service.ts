import { AppError } from '@helpers/AppError.helper';
import * as repo from '@repositories/session.repo';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { SessionComplet } from '@type/session/SessionComplet';
import { Seance, SessionReq } from '@type/session/SessionReq';
import { ExerciceService } from './exercice.service';
import { StrategieService } from './strategie.service';

export class SessionService {
  /**
   * Renvoie une session par son identifiant.
   * @param id L'identifiant de la session que vous souhaitez obtenir
   * @param populate Remplacer les ID par des objets exercices
   * @returns Une session
   * @throws AppError si l'ID de l'exercice n'existe pas, ou si l'ID de la session n'est pas au format ObjectId
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

  /**
   * Renvoie l'exercice suivant d'une session, compte tenu de l'exercice en cours
   * @param idSession l'identifiant de la session
   * @param idExercice l'identifiant de l'exercice en cours, (peut être init si on veux le premier exercice)
   * @param idSeance l'identifiant de la séance
   * @returns Le prochain exercice d'une session
   * @throws Error si le service stratégie n'est pas accessible
   */
  public static async getNextExerciceOfSession(
    idSession: SessionComplet['id'],
    idExercice: ExerciceComplet['id'] | 'init',
    idSeance: Seance['id'],
  ): Promise<ExerciceComplet | undefined> {
    const session = await SessionService.getSessionById(idSession, true);
    const strategie = session.strategie;
    const exercices = session.exercices as ExerciceComplet[];

    // On vérifie que la séance n'est pas terminer
    const seance = session.seances.find((seance) => seance.id === idSeance);

    if (!seance) throw new AppError("La séance n'existe pas", 404);

    if (new Date() > seance.dateFin) throw new AppError('La séance est terminée', 400);

    // On vérifie que l'exercice est dans la session
    let found = false;
    for (const exo of exercices) {
      if (exo.id === idExercice) {
        found = true;
        break;
      }
    }

    // S'il ne n'est pas
    if (!found && idExercice !== 'init')
      throw new AppError(`L'exercice ${idExercice} n'est pas dans la session ${idSession}`, 404);

    const nextExo = await StrategieService.getNextExercice(
      strategie,
      exercices,
      idExercice === 'init' ? undefined : idExercice,
    );

    return nextExo;
  }

  /**
   * Vérifie si une séance est dans une session
   * @param idSession - L'identifiant de la session
   * @param idSeance - L'identifiant de la séance
   * @returns Un booléen indiquant si la séance est dans la session
   */
  public static async seanceInSession(
    idSession: SessionComplet['id'],
    idSeance: Seance['id'],
  ): Promise<boolean> {
    let session: SessionComplet;

    try {
      session = await SessionService.getSessionById(idSession, false);
    } catch {
      return false;
    }

    const seances = session.seances;

    if (!seances) return false;

    // prettier-ignore
    for (const seance of seances) 
      if (seance.id === idSeance) 
        return true;

    return false;
  }
}
