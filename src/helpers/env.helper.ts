/**
 * Permet de retourner un objet en fonction de l'environnement
 *
 * @param production Objet quelconque devant être retournée en production
 * @param developpment Objet quelconque devant être retournée en développement
 * @param testing Objet optionnel si on est en testing (tests unitaires). Si non spécifié et en environnement testing, retourneras developpment
 * @returns L'un des trois objet production developpement ou testing, jamais undefined
 */
export function envDependent<P, D, T = undefined>(
  production: NonNullable<P>,
  developpment: NonNullable<D>,
  testing?: T,
): P | D | (T extends undefined | null ? D : T) {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;

    case 'developpment':
      return developpment;

    case 'testing':
      return testing ?? developpment;

    // Si on ne connait pas l'environnement, parton du principe que nous sommes en production
    default:
      return production;
  }
}
