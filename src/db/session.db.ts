import { SessionComplet } from '@type/session/SessionComplet';
import { Seance } from '@type/session/SessionReq';
import { Document, model, Schema } from 'mongoose';

const SeanceSchema = new Schema<Seance>({
  groupe: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  encadrant: {
    type: String,
    required: true,
  },
});

const SessionSchema = new Schema({
  strategie: {
    type: String,
    enum: ['lineaire'],
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
  },
  seances: {
    type: [SeanceSchema],
    required: false,
  },
  exercices: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Exercice' }],
    required: true,
  },
});

[SessionSchema, SeanceSchema].forEach((schema) => {
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
  schema.set('strictQuery', false);
});

// Type ici car je n'es pas pu faire Schema<SessionComplet> : conflit sur SessionSchema.exercices avec type initial
export const Session = model<SessionComplet & Document>('Session', SessionSchema);
