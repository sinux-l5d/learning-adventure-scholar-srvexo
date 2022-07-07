import { ExercicePourResultat } from '@type/exercice/ExercicePourResultat';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import axios from 'axios';
import config from '@config';
import { SessionService } from './session.service';

/**
 * Service de gestion d'envoi d'exercices au service résultat
 */
export class ResultatService {
  /**
   * @param exo sous sa forme complete.
   * @returns un exercice compatible avec ExercicePourResultat
   * @throws Error (TODO)
   */
  public static construireExercicePourResultat(
    exo: ExerciceComplet,
    etu: ExercicePourResultat['idEtu'],
    ses: ExercicePourResultat['idSession'],
    nomSession: ExercicePourResultat['nomSession'],
    seance: ExercicePourResultat['idSeance'],
  ): ExercicePourResultat {
    // ajouter l'id étudiant
    // ajouter id et nom de session
    // et recopier un à un les champs que l'on veut garder
    const resJSON: ExercicePourResultat = {
      idEtu: etu,
      idExo: exo['id'],
      idSession: ses,
      idSeance: seance,
      nomSession: nomSession,
      nomExo: exo['nom'],
      langage: exo['langage'],
      difficulte: exo['difficulte'],
      auteurs: exo['auteurs'],
      themes: exo['themes'],
      tempsMaximum: exo['tempsMaximum'],
      tempsMoyen: exo['tempsMoyen'],
    };
    return resJSON;
  }

  /**
   * Prend un exercice, un étudiant, une session et une seance, et envoie l'exercice au service de
   * résultat
   * @param exo Exercice à envoyer,
   * @param etu ID de l'étudiant,
   * @param ses ID de la session
   * @param seance ID de la séance (se trouvant dans la session),
   * @throws Error si la requête échoue
   */
  public static async postExercicePourResultat(
    exo: ExerciceComplet,
    etu: ExercicePourResultat['idEtu'],
    ses: ExercicePourResultat['idSession'],
    seance: ExercicePourResultat['idSeance'],
  ) {
    const nomSession = (await SessionService.getSessionById(ses, false)).nom;
    const resJSON: ExercicePourResultat = ResultatService.construireExercicePourResultat(
      exo,
      etu,
      ses,
      nomSession,
      seance,
    );
    // propage l'erreur s'il y en a une
    await axios.post(`${config.RESULT_URL}/exercices`, resJSON);
  }

  public static async postTentativePourResultat(
    idEtu: string,
    idExo: string,
    idSession: string,
    reponseEtudiant: string,
    logs: string,
    status: string,
  ) {
    await axios.post(`${config.RESULT_URL}/tentatives`, {
      idEtu,
      idExo,
      idSession,
      reponseEtudiant,
      logErreurs: logs, // bad name
      validationExercice: status === 'ok',
      dateSoumission: new Date().toISOString(),
    });
  }
}
