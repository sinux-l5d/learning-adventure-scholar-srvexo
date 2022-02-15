import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { StrategieService } from '@services/strategie.service';
import axios from 'axios';
import { config } from 'dotenv';

config({ path: '.env' });

jest.mock('axios');
// Le transpileur de TS ne sait pas que jest.mock modifie repo
const mockAxios = axios as unknown as jest.Mocked<typeof axios>;

describe('Strategie service', () => {
  it('recupere exercice suivant depuis le service stratégie', async () => {
    const idCourant: ExerciceComplet['id'] = '121654fdsf';

    mockAxios.get.mockResolvedValueOnce({ data: { next: '456789dadadz' } });

    const nextid = await StrategieService.callStrategieForNextId(idCourant);

    expect(mockAxios.get).toBeCalledWith(`${process.env.STRAT_URL}/next/${idCourant}`);
    expect(mockAxios.get).toBeCalledTimes(1);
    expect(nextid).toBe('456789dadadz');
  });
});
