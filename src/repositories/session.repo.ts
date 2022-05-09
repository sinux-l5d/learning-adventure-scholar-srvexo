import { Session } from '@db/session.db';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';
import { SessionComplet } from '@type/session/SessionComplet';

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
