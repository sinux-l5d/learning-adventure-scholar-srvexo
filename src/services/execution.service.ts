import config from '@config';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import axios from 'axios';
import { ExerciceService } from './exercice.service';

export class ExecutionService {
  public static async execute(
    code: string,
    idExo: ExerciceComplet['id'],
  ): Promise<{ status: string; statusCode: number; output: string }> {
    const exercice = ExerciceService.getExerciceCompletById(idExo);
    const res = await axios.post(`${config.EXEC_URL}/exec`, {
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
