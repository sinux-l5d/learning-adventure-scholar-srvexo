import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { SessionReq } from './SessionReq';

/**
 * Session d'exercices avec ID.
 */
export type SessionComplet = Omit<SessionReq, 'exercices'> & {
  id: string;
  exercices: string[] | ExerciceComplet[];
};
