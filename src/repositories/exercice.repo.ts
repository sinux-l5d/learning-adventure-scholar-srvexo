import { Exercice } from '@db/exercice.db';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';

/**
 * Renvoie un exercice en fonction de son ID.
 *
 * @throws Error si l'exercice n'a pas été trouvé.
 * @todo filtrer les attributs de l'exercice qui ne servent pas (attributs spécifiques à BDD) (Document & Exo & _id -> Exo)
 * @todo gérer erreurs
 * @simplifié façon de renvoyer et généraliser
 */
export const getExerciceCompletById = async (
  id: ExerciceComplet['id'],
): Promise<ExerciceComplet> => {
  const exo = await Exercice.findById(id).exec();
  if (exo) {
    return {
      id: exo._id + '',
      nom: exo.nom,
      template: exo.template,
      enonce: exo.enonce,
      difficulte: exo.difficulte,
      theme: exo.theme,
      langage: exo.langage,
      tempsMoyen: exo.tempsMoyen,
      tempsMaximum: exo.tempsMaximum,
      dataset: exo.dataset,
      correction: exo.correction,
      commentaire: exo.commentaire,
      aides: exo.aides,
      auteurs: exo.auteurs,
      session: exo.session,
    };
  }
  throw new Error('Not found');
};
