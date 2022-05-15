import { Session } from '@db/session.db';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';
import { SessionComplet } from '@type/session/SessionComplet';
import { Seance, SeanceReq, SessionReq } from '@type/session/SessionReq';

/**
 * Renvoie une session par son ID, et si le paramètre populate est vrai, remplit la session avec des objets exercices
 * @param id L'identifiant de la session à obtenir
 * @param populate Remplacer les ID par des objets exercices
 * @returns Un objet de session
 * @throws AppError si l'ID de l'exercice n'existe pas, ou si l'ID de la session n'est pas au format ObjectId
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

  // prettier-ignore
  if (populate)
    for (const session of sessions)
      await session.populate('exercices');

  return sessions;
};

/**
 * Ajoute une nouvelle session dans la base de données
 * @param session - La session SessionReq (session sans id) à ajouter
 * @returns Une promesse de SessionComplet (session avec un id)
 * @throws Error si la session n'a pas pu être créer
 */
export const addSession = async (
  session: SessionReq,
  populate = false,
): Promise<SessionComplet> => {
  try {
    const sessionDB = new Session(session);
    await sessionDB.save();

    if (populate) await sessionDB.populate('exercices');

    return sessionDB;
  } catch (error) {
    throw new AppError(
      envDependent('', 'addSession: ') + 'Erreur lors de la création de la session : ' + error,
      400,
    );
  }
};

/**
 * Modifie la seance dans la bdd avec les nouvelles données
 * @param idSession - L'identifiant de la session
 * @param idSeance - L'identifiant de la séance
 * @param seance - Les nouvelles données de la séance
 * @throws AppError si l'ID de la session n'est pas au format ObjectId
 */
export const modifierSeance = async (
  idSession: SessionComplet['id'],
  idSeance: Seance['id'],
  seance: SeanceReq,
): Promise<SessionComplet> => {
  const toUpdate: { [k: string]: string | Date } = {};

  for (const [key, value] of Object.entries(seance)) {
    toUpdate['seances.$.' + key] = value;
  }

  const newDoc = await Session.findOneAndUpdate(
    { _id: idSession, 'seances._id': idSeance },
    {
      $set: toUpdate,
    },
    { new: true },
  ).exec();

  if (!newDoc)
    throw new AppError(envDependent('', 'modifierSeance: ') + 'Session ou séance non trouvée', 404);

  return newDoc;
};
