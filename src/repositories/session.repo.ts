import { Session } from '@db/session.db';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';
import { SessionComplet } from '@type/session/SessionComplet';

/**
 * Renvoie une session par son ID, et si le paramètre populate est vrai, remplit la session avec des objets exercices
 * @param id L'identifiant de la session à obtenir
 * @param populate Remplacer les ID par des objets exercices
 * @returns Un objet de session
 */
export const getSessionById = async (id: string, populate = false): Promise<SessionComplet> => {
  let session;

  // renvoie null si l'exo n'est pas trouvé.
  // throw une exeption si le format de l'ID n'est pas bon
  try {
    session = await Session.findById(id).exec();
  } catch {
    throw new AppError(envDependent('', 'getSessionById: ') + "Mauvais format d'ID", 400);
  }

  if (!session)
    throw new AppError(envDependent('', 'getSessionById: ') + 'Session non trouvée', 404);

  if (populate) {
    return session.populate('exercices');
  } else {
    return session;
  }
};

/**
 * Renvoie toutes les sessions de la base de données
 * @param populate Remplacer les ID par des objets exercices
 * @returns Un tableau de sessions
 */
export const getAllSessions = async (populate = false): Promise<SessionComplet[]> => {
  const sessions = await Session.find().exec();

  if (populate)
    for (const session of sessions) {
      await session.populate('exercices');
    }

  return sessions;
};

export const addSession = async (session: SessionComplet): Promise<SessionComplet> => {
  try {
    return await Session.create(session);
  } catch (error) {
    throw new AppError(
      envDependent('', 'addSession: ') + 'Erreur lors de la création de la session : ' + error,
      400,
    );
  }
};
