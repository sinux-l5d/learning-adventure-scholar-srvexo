import { Test } from './Test';

/**
 * Forme d'un exercice complet
 */
export type ExerciceComplet = {
  /**
   * ID d'un exercice au format ObjectID (Mongo)
   */
  id: string;

  /**
   * Nom de l'exercice
   */
  nom: string;

  /**
   * template de l'exercice
   */
  template: string;

  /**
   * énoncé de l'exercice
   */
  enonce: string;

  /**
   * Difficulté de l'exercice
   *
   * La difficulté est comprise entre 1 et 10 inclus
   *
   */
  difficulte: number;

  /**
   * Thèmes possible de l'exercice
   *
   * @example
   * boucles, recursif
   */
  theme: Array<string>;

  /**
   * Langage de l'exercice
   */
  langage: string;

  /**
   * Temps moyen de la résolution de l'exercice
   */
  tempsMoyen?: number;

  /**
   * Temps maximum pour résoudre l'exercice
   */
  tempsMaximum?: number;

  /**
   * Data set de l'exercice.
   * Contient le contexte et les jeux de tests de l'exercice
   */
  dataset: Array<{ contexte: string; jeuDeTests: Array<Test> }>;

  /**
   * Correction de l'exercice
   */
  correction: string;

  /**
   * Commentaire sur la correction de l'exercice
   */
  commentaire?: string;

  /**
   * Aides envoyé à l'étudiant après plusieurs erreures
   */
  aides?: Array<string>;

  /**
   * Auteurs de l'exercice
   */
  auteurs: Array<string>;

  /**
   * Session ou l'exercice est utilisé
   */
  session?: string;
};
