import * as repo from '@repositories/session.repo';
import { SessionComplet } from '@type/session/SessionComplet';

export class SessionService {
  public static async getSessionById(id: string, populate = false): Promise<SessionComplet> {
    return await repo.getSessionById(id, populate);
  }
}
