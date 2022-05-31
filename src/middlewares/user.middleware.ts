import { AppError } from '@helpers/AppError.helper';
import { RequestHandler } from 'express';

/**
 * Vérifie si l'en-tête X-Etudiant-ID est présent et si c'est le cas, définit la propriété
 * user dans l'objet Request de Express.
 * Si l'en-tête n'est pas présent, ou invalide, une erreur est retournée.
 */
export const handleUserHeader: RequestHandler = (req, _res, next) => {
  const user = req.headers['x-etudiant-id'];

  if (user && typeof user === 'string') {
    const reUser = /^[a-zA-Z][a-zA-Z-]*[a-zA-Z]\.[a-zA-Z][a-zA-Z-]*[a-zA-Z]$/; // 2 lettres minimum
    if (!reUser.test(user))
      next(new AppError(`Format de l'identifiant incorrect pour '${user}' (prenom.nom)`, 400));
    req.user = user.toLowerCase();
    next();
  } else if (typeof user !== 'string') {
    next(new AppError("Le format du header X-Etudiant-ID n'est pas bon", 400));
  } else {
    next(new AppError('Header X-Etudiant-ID manquant', 401));
  }
};

/**
 * Vérifie si l'en-tête X-Session-ID est présent et si c'est le cas, définit la propriété
 * session dans l'objet Request de Express.
 * Si l'en-tête n'est pas présent, ou invalide, une erreur est retournée.
 */
export const handleSeanceHeader: RequestHandler = (req, _res, next) => {
  const seance = req.headers['x-seance-id'];

  if (seance && typeof seance === 'string') {
    // c'est a la route de vérifier si la seance existe, le middleware n'as pas l'id de session (pas directement)
    const reObjectId = /^[0-9a-fA-F]{24}$/;
    if (!reObjectId.test(seance))
      next(new AppError(`Format de l'identifiant incorrect pour '${seance}' (ObjectId)`, 400));
    req.seance = seance;
    next();
  } else if (typeof seance !== 'string') {
    next(new AppError("Le format du header X-Seance-ID n'est pas bon", 400));
  } else {
    next(new AppError('Header X-Seance-ID manquant', 401));
  }
};
