import { AppError } from '@helpers/AppError.helper';
import { RequestHandler } from 'express';

/**
 * Vérifie si l'en-tête X-Etudiant-ID est présent et si c'est le cas, définit la propriété
 * user dans l'en-tête de la requête
 */
export const handleUserHeader: RequestHandler = (req, _res, next) => {
  const user = req.headers['x-etudiant-id'];
  console.log(req.headers);
  console.log('User is ', user);
  if (user && typeof user === 'string') {
    const regEx = /^[a-zA-Z][a-zA-Z\-]*[a-zA-Z]\.[a-zA-Z][a-zA-Z\-]*[a-zA-Z]$/; // 2 lettres minimum
    const valid = regEx.test(user);
    if (!valid)
      next(new AppError(`Format de l'identifiant incorrect pour '${user}' (prenom.nom)`, 400));
    req.user = user.toLowerCase();
    next();
  } else if (typeof user !== 'string') {
    next(new AppError("Le format du header X-Etudiant-ID n'est pas bon", 400));
  } else {
    next(new AppError('Header X-Etudiant-ID manquant', 401));
  }
};
