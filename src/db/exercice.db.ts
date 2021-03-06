import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { model, Schema } from 'mongoose';

/**
 * Schéma d'un exercice en base de donnée.
 */
const ExerciceSchema = new Schema<ExerciceComplet>({
  nom: {
    type: String,
    required: true,
  },
  template: {
    type: String,
  },
  enonce: {
    type: String,
  },
  difficulte: {
    type: Number,
    min: 1,
    max: 10,
  },
  themes: {
    type: [String],
    required: true,
  },
  langage: {
    type: String,
    required: true,
  },
  tempsMoyen: {
    type: Number,
  },
  tempsMaximum: {
    type: Number,
  },
  contexte: {
    type: Map,
    of: Object,
  },
  correction: {
    type: String,
    required: true,
  },
  commentaire: {
    type: String,
  },
  aides: {
    type: [String],
  },
  auteurs: {
    type: [String],
    required: true,
  },
});

[ExerciceSchema].forEach((schema) => {
  // Enlève les propriétés non voulu lorsque l'on transforme en JSON
  schema.set('toJSON', {
    // pour avoir `id`, alias natif de `_id`. virtual = alias
    virtuals: true,
    // pour ne pas avoir __v, version du document par Mongoose
    versionKey: false,
    // true par défaut, mais pour que vous sachiez: convertie les Maps en POJO
    flattenMaps: true,
    getters: false,
    // delete `_id` manuellement
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    },
  });

  // Si un filtre de recherche utilise une clé non existante, on renvoie une erreur
  schema.set('strictQuery', false);
});

export const Exercice = model('Exercice', ExerciceSchema);
