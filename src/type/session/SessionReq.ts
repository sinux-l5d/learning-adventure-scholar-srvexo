type ObjectId = string;

/**
 * Une seance est encadré par un enseignant. Il peut y avoir plusieurs séances en parallèle, avec des groupes différents.
 * @property id L'id de la scéance
 * @property groupe Nom du groupe de la séance
 * @property encadrant L'enseignant de la séance
 * @property dateDebut La date de début de la séance
 * @property dateFin La date de fin de la séance
 */
export type Seance = {
  id: ObjectId;
  groupe: string;
  dateDebut: Date;
  dateFin: Date;
  encadrant: string;
};

export type SeanceReq = Partial<Omit<Seance, 'id'>>;

/**
 * Requête de création d'une session.
 *
 * Une session est un ensemble d'exercices, lié par une stratégie.
 * Une seance (de TP) se déroule dans le cadre d'une session
 *
 * @property stategie 'linéaire' pour l'instant.
 * @property nom Le nom de la séance
 * @property seances un tableau d'objets, chaque objet a une propriété de groupe et une propriété de
 * date.
 * @property auteur L'auteur de la session
 * @property exercices Un tableau d'ObjectIds qui correspondent aux exercices qui seront utilisés
 * dans la session.
 */
export type SessionReq = {
  strategie: 'lineaire'; // ajouter des options avec |
  nom: string;
  seances: Array<Seance>;
  auteur: string;
  exercices: Array<ObjectId>;
};
