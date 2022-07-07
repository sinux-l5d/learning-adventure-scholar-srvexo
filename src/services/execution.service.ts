import config from '@config';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import axios from 'axios';
import { ExerciceService } from './exercice.service';

export class ExecutionService {
  private static api = axios.create({
    baseURL: config.EXEC_URL,
    validateStatus(status) {
      return status >= 200 && status < 500;
    },
  });

  public static async execute(
    code: string,
    idExo: ExerciceComplet['id'],
  ): Promise<{ status: string; statusCode: number; output: string }> {
    const exercice = ExerciceService.getExerciceCompletById(idExo);
    const res = await this.api.post(`${config.EXEC_URL}/exec`, {
      code,
      exercice,
    });
    return {
      status: res.data.status,
      statusCode: res.status,
      output: res.data.output,
    };
  }
}
