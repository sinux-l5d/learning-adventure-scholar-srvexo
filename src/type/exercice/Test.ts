/**
 * @todo Besoin de plus de réflexion
 */
export type UnknownType = {
  nomType: 'string' | 'int'; // ou juste string ?
  valeur: string;
};

/**
 * série de test utilisé pour valider la reponse d'un étudiant
 */
export type Test = {
  parametres: Array<UnknownType>;
  reponse: UnknownType;
};
