import { ExercicePourResultat } from '@type/exercice/ExercicePourResultat';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import axios from 'axios';
import config from '@config';

/**
 * Service de gestion d'envoi d'exercices au service résultat
 */
export class ResultatService {
  /**
   *
   * @param exo sous sa forme complete.
   * @returns un exercice compatible avec ExercicePourResultat
   * @throws Error (TODO)
   */
  public static construireExercicePourResultat(
    exo: ExerciceComplet,
    etu: ExercicePourResultat['idEtu'],
    ses: ExercicePourResultat['idSession'],
  ): ExercicePourResultat {
    // ajouter l'id étudiant
    // ajouter id et nom de session
    // et recopier un à un les champs que l'on veut garder
    const resJSON: ExercicePourResultat = {
      idEtu: etu,
      idExo: exo['id'],
      idSession: ses,
      nomSession:
        'que dire ... ' /* comment gérer le nom de session ? je pense qu'il ne sert a rien, l'id suffit*/,
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

  public static async postExercicePourResultat(
    exo: ExerciceComplet,
    etu: ExercicePourResultat['idEtu'],
    ses: ExercicePourResultat['idSession'],
  ) {
    const resJSON: ExercicePourResultat = ResultatService.construireExercicePourResultat(
      exo,
      etu,
      ses,
    );
    // propage l'erreur s'il y en a une
    await axios.post(`${config.RESULT_URL}/exercices`, resJSON);
  }
}
