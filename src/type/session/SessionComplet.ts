import { SessionReq } from './SessionReq';

/**
 * Session d'exercices.
 */
export type SessionComplet = SessionReq & {
  id: string;
};
