type ObjectId = string;

/**
 * Requête de création d'une session.
 * @property stategie - 'linéaire' pour l'instant.
 * @property {string} nom - Le nom de la séance
 * @property seances - un tableau d'objets, chaque objet a une propriété de groupe et une propriété de
 * date.
 * @property exercices - Un tableau d'ObjectIds qui correspondent aux exercices qui seront utilisés
 * dans la session.
 */
export type SessionReq = {
  strategie: 'lineaire';
  nom: string;
  seances?: Array<{ groupe: string; date: Date }>;
  exercices: Array<ObjectId>;
};
