import { ExercicePourResultat } from '@type/exercice/ExercicePourResultat';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { ResultatService } from '@services/resultat.service';
import axios from 'axios';
import config from '@config';

jest.mock('axios');
// Le transpileur de TS ne sait pas que jest.mock modifie repo
const mockAxios = axios as unknown as jest.Mocked<typeof axios>;

const exo_exemple: ExerciceComplet = {
  id: '621dde28dba76f1febefb4f3',
  nom: 'La suite de vanErk',
  difficulte: 8,
  themes: ['suites', 'fichiers', 'mathématiques'],
  langage: 'c',
  template:
    '#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen("./outputVE.txt", "w+");\n    \n}',
  correction:
    '#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen("./outputVE.txt", "w+");\n    \n    int* lastSeen = (int*)calloc(K_MAX,sizeof(int));\n    int lastNum, i, tmpI = 0;\n    while(lastNum < K_MAX)\n    {\n        i++;\n        // Step 1 : print the last number\n        fprintf(fp, "%d, ", lastNum);\n        // Step 2 : find when that last number was printed and throw the diff for the last num\n        tmpI = lastNum;\n        lastNum=!lastSeen[lastNum]?0:i-lastSeen[lastNum];\n        // Step 3 : reload the last time i saw the last last num \n        lastSeen[tmpI]=i;\n    }\n    fprintf(fp, "%d, ", lastNum);\n    free(lastSeen);\n    fclose(fp);\n}',
  aides: ['penser à utiliser un fichier sous le nom "outputVE.txt" en mode écriture'],
  auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
  enonce:
    'Ecrivez un programme qui imprime dans un fichier la séquence de van erk (voir le lien : https://www.youtube.com/watch?v=etMJxB-igrc&pp=ugMICgJmchABGAE%3D). Le fichier pour K_MAX = 5 doit contenir "0, 0, 1, 0, 2, "',
  dataset: [],
};

const exo_result = {
  auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
  difficulte: 8,
  idEtu: 'etu',
  idExo: '621dde28dba76f1febefb4f3',
  idSession: 'coursL3',
  langage: 'c',
  nomExo: 'La suite de vanErk',
  nomSession: 'que dire ... ',
  tempsMaximum: undefined,
  tempsMoyen: undefined,
  themes: ['suites', 'fichiers', 'mathématiques'],
};

describe('Resultat service', () => {
  test("envoie l'exercice au service résultat", async () => {
    mockAxios.post.mockResolvedValueOnce({ OK: '200' });
    await ResultatService.postExercicePourResultat(exo_exemple, 'etu', 'coursL3');

    expect(mockAxios.post).toBeCalledWith(`${config.RESULT_URL}/exercices`, exo_result);
    expect(mockAxios.post).toBeCalledTimes(1);
  });
});
