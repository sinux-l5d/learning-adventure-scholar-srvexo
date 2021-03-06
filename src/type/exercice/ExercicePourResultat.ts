import { ExerciceComplet } from './ExerciceComplet';

/**
 * Forme d'un exercice complet
 */
export type ExercicePourResultat = Omit<
  ExerciceComplet,
  'contexte' | 'id' | 'nom' | 'template' | 'correction'
> & {
  idEtu: string;
  idExo: ExerciceComplet['id'];
  idSession: string;
  idSeance: string;
  nomSession: string;
  nomExo: ExerciceComplet['nom'];
};
// export type ExercicePourResultat = {
//   /**
//    * ID d'un exercice au format ObjectID (Mongo)
//    */
//   idExo: string;

//   /**
//    * Id étudiant
//    */
//   idEtu: string;

//   /**
//    * Id session
//    */
//   idSession: string;

//   /**
//    * Le nom de la session correspondant à l'idSession
//    */
//   nomSession: string;

//   /**
//    * Id séance
//    */
//   idSeance: string;

//   /**
//    * Nom de l'exercice
//    */
//   nomExo: string;

//   enonce: string;

//   /**
//    * Difficulté de l'exercice
//    *
//    * La difficulté est comprise entre 1 et 10 inclus
//    */
//   difficulte: number;

//   /**
//    * Thèmes possible de l'exercice
//    *
//    * @example
//    * boucles, recursif
//    */
//   themes: Array<string>;

//   /**
//    * Langage de l'exercice
//    */
//   langage: string;

//   /**
//    * Temps moyen de la résolution de l'exercice
//    */
//   tempsMoyen?: number;

//   /**
//    * Temps maximum pour résoudre l'exercice
//    */
//   tempsMaximum?: number;

//   /**
//    * Auteurs de l'exercice
//    */
//   auteurs: Array<string>;
// };
