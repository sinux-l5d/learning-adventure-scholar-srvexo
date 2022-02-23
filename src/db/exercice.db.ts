import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { Test } from '@type/exercice/Test';
import { model, Schema } from 'mongoose';

/**
 * Schéma d'un test en base de donnée.
 * Utilisé dans ExerciceSchema.
 */
const TestSchema = new Schema<Test>({
  parametres: [
    {
      nomType: String,
      valeur: String,
    },
  ],
  reponse: {
    nomType: String,
    valeur: String,
  },
});

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
  theme: {
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
  dataset: {
    type: [
      {
        context: {
          type: String,
        },
        jeuDeTests: {
          type: [TestSchema],
        },
      },
    ],
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
  session: {
    type: String,
  },
});

ExerciceSchema.set('toObject', {
  getters: false,
  virtuals: false,
  versionKey: false,
  flattenMaps: true,
  transform: (_doc, ret, _options) => {
    ret.id = ret._id + ''; // transformer ObjectID en string
    delete ret._id;
  },
});

export const Exercice = model('Exercice', ExerciceSchema);
