import { ExerciceService } from '@services/exercice.service';
import * as repo from '@repositories/exercice.repo';
import { AppError } from '@helpers/AppError.helper';
import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import exp from 'constants';
import { Exercice } from '@db/exercice.db';

jest.mock('@repositories/exercice.repo');

const mockRepo = repo as unknown as jest.Mocked<typeof repo>;

const exercices = [
  {
    id: '1',
    nom: 'les boucles en python',
    difficulte: 4,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Polux', 'Sinux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
  {
    id: '2',
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Cam', 'Leon', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
  {
    id: '2',
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'c',
    correction: 'blabla',
    aides: [],
    auteurs: ['Gi', 'Raphe', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

const exercicesAvecFiltres = [
  {
    id: '2',
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Cam', 'Leon', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
  {
    id: '2',
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Gi', 'Raphe', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

const newListeExerciceSingle: Omit<ExerciceComplet, 'id'>[] = [
  {
    nom: 'La suite de vanErk',
    difficulte: 8,
    themes: ['suites', 'fichiers', 'mathématiques'],
    langage: 'c',
    template:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n}",
    correction:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n    int* lastSeen = (int*)calloc(K_MAX,sizeof(int));\n    int lastNum, i, tmpI = 0;\n    while(lastNum < K_MAX)\n    {\n        i++;\n        // Step 1 : print the last number\n        fprintf(fp, '%d, ', lastNum);\n        // Step 2 : find when that last number was printed and throw the diff for the last num\n        tmpI = lastNum;\n        lastNum=!lastSeen[lastNum]?0:i-lastSeen[lastNum];\n        // Step 3 : reload the last time i saw the last last num \n        lastSeen[tmpI]=i;\n    }\n    fprintf(fp, '%d, ', lastNum);\n    free(lastSeen);\n    fclose(fp);\n}",
    aides: ["penser à utiliser un fichier sous le nom 'outputVE.txt' en mode écriture"],
    auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
    enonce:
      "Ecrivez un programme qui imprime dans un fichier la séquence de van erk (voir le lien : https://www.youtube.com/watch?v=etMJxB-igrc&pp=ugMICgJmchABGAE%3D). Le fichier pour K_MAX = 5 doit contenir '0, 0, 1, 0, 2, '",
    dataset: [],
  },
];

const newListeExerciceSingleResolved: ExerciceComplet[] = [
  {
    id: '12345abcde',
    nom: 'La suite de vanErk',
    difficulte: 8,
    themes: ['suites', 'fichiers', 'mathématiques'],
    langage: 'c',
    template:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n}",
    correction:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n    int* lastSeen = (int*)calloc(K_MAX,sizeof(int));\n    int lastNum, i, tmpI = 0;\n    while(lastNum < K_MAX)\n    {\n        i++;\n        // Step 1 : print the last number\n        fprintf(fp, '%d, ', lastNum);\n        // Step 2 : find when that last number was printed and throw the diff for the last num\n        tmpI = lastNum;\n        lastNum=!lastSeen[lastNum]?0:i-lastSeen[lastNum];\n        // Step 3 : reload the last time i saw the last last num \n        lastSeen[tmpI]=i;\n    }\n    fprintf(fp, '%d, ', lastNum);\n    free(lastSeen);\n    fclose(fp);\n}",
    aides: ["penser à utiliser un fichier sous le nom 'outputVE.txt' en mode écriture"],
    auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
    enonce:
      "Ecrivez un programme qui imprime dans un fichier la séquence de van erk (voir le lien : https://www.youtube.com/watch?v=etMJxB-igrc&pp=ugMICgJmchABGAE%3D). Le fichier pour K_MAX = 5 doit contenir '0, 0, 1, 0, 2, '",
    dataset: [],
  },
];

const newListeExerciceMultiple: Omit<ExerciceComplet, 'id'>[] = [
  {
    nom: 'La suite de vanErk',
    difficulte: 8,
    themes: ['suites', 'fichiers', 'mathématiques'],
    langage: 'c',
    template:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n}",
    correction:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n    int* lastSeen = (int*)calloc(K_MAX,sizeof(int));\n    int lastNum, i, tmpI = 0;\n    while(lastNum < K_MAX)\n    {\n        i++;\n        // Step 1 : print the last number\n        fprintf(fp, '%d, ', lastNum);\n        // Step 2 : find when that last number was printed and throw the diff for the last num\n        tmpI = lastNum;\n        lastNum=!lastSeen[lastNum]?0:i-lastSeen[lastNum];\n        // Step 3 : reload the last time i saw the last last num \n        lastSeen[tmpI]=i;\n    }\n    fprintf(fp, '%d, ', lastNum);\n    free(lastSeen);\n    fclose(fp);\n}",
    aides: ["penser à utiliser un fichier sous le nom 'outputVE.txt' en mode écriture"],
    auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
    enonce:
      "Ecrivez un programme qui imprime dans un fichier la séquence de van erk (voir le lien : https://www.youtube.com/watch?v=etMJxB-igrc&pp=ugMICgJmchABGAE%3D). Le fichier pour K_MAX = 5 doit contenir '0, 0, 1, 0, 2, '",
    dataset: [],
  },
  {
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Gi', 'Raphe', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

const newListeExerciceMultipleResolved: ExerciceComplet[] = [
  {
    id: 'efz56e51161daz',
    nom: 'La suite de vanErk',
    difficulte: 8,
    themes: ['suites', 'fichiers', 'mathématiques'],
    langage: 'c',
    template:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n}",
    correction:
      "#include <stdlib.h>\n#include <stdio.h>\n\nvoid vanErk(int K_MAX) \n{\n    /*K_MAX = what is the maximum K allowed to appear in the sequence*/\n    FILE *fp;\n       fp = fopen('./outputVE.txt', 'w+');\n    \n    int* lastSeen = (int*)calloc(K_MAX,sizeof(int));\n    int lastNum, i, tmpI = 0;\n    while(lastNum < K_MAX)\n    {\n        i++;\n        // Step 1 : print the last number\n        fprintf(fp, '%d, ', lastNum);\n        // Step 2 : find when that last number was printed and throw the diff for the last num\n        tmpI = lastNum;\n        lastNum=!lastSeen[lastNum]?0:i-lastSeen[lastNum];\n        // Step 3 : reload the last time i saw the last last num \n        lastSeen[tmpI]=i;\n    }\n    fprintf(fp, '%d, ', lastNum);\n    free(lastSeen);\n    fclose(fp);\n}",
    aides: ["penser à utiliser un fichier sous le nom 'outputVE.txt' en mode écriture"],
    auteurs: ['Le Mathématicien refoulé du groupe', 'Jacques-Olivier Lachaud'],
    enonce:
      "Ecrivez un programme qui imprime dans un fichier la séquence de van erk (voir le lien : https://www.youtube.com/watch?v=etMJxB-igrc&pp=ugMICgJmchABGAE%3D). Le fichier pour K_MAX = 5 doit contenir '0, 0, 1, 0, 2, '",
    dataset: [],
  },
  {
    id: '48ef18af84f78q84dza849',
    nom: 'Hello World',
    difficulte: 2,
    themes: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Gi', 'Raphe', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

describe('Service exercice', () => {
  test("getAllExercicesWithFilters : test que tous les exercices sont renvoyés quand il n'y a pas de filtres", async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercices); // simule la reponce du repo pour tester uniquement le traitement du service

    const tabExo = await ExerciceService.getAllExercicesWithFilters({}); // appel a la fonction a tester
    expect(tabExo).toBeDefined(); // est defini ?
    expect(tabExo).toBe(exercices); // les bons exos ?
  });

  test("getAllExercicesWithFilters : test qu'on est les bons exos avec des filtres", async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercicesAvecFiltres);
    const filtres = { nom: 'Hello World' };
    const tabExo = await ExerciceService.getAllExercicesWithFilters(filtres);
    expect(tabExo).toBeDefined(); // est defini ?
    expect(tabExo).toBe(exercicesAvecFiltres); // les bons exos
  });

  test("getAllexercicesWithFilters : test q'une erreur est levé quand il n'y a pas d'exercices", async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce([]);
    try {
      await ExerciceService.getAllExercicesWithFilters({});
    } catch (err) {
      expect(err).toBeInstanceOf(AppError); // bon type d'erreur ?
    }
  });

  test('getExerciceWithFilter : test de recuperer un exercice sans filtre', async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercices);

    const exo = await ExerciceService.getExerciceWithFilters({});
    expect(exo).toBeDefined();
    expect(typeof exo).toBe('object');
  });

  test('getExerciceWithFilter : test recuperer un exercice avec des filtres', async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercicesAvecFiltres);
    const filtres = { auteurs: 'Polux', langage: 'python' };

    const exo = await ExerciceService.getExerciceWithFilters(filtres);

    expect(exo.auteurs).toEqual(expect.arrayContaining([filtres.auteurs]));
    expect(exo.langage).toBe(filtres.langage);
  });

  test("getExerciceWithFilter : test qu'une erreur est bien retourner quand il n'y a pas d'exercice", async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce([]);
    try {
      await ExerciceService.getExerciceWithFilters({});
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("postNewExercices : test d'entrer un exo unique", async () => {
    mockRepo.postNewExercices.mockResolvedValueOnce(newListeExerciceSingleResolved);
    const requestResult = await ExerciceService.postNewExercices(
      newListeExerciceSingle as ExerciceComplet[],
    );
    expect(requestResult).toBeDefined();
    expect(requestResult).toEqual(newListeExerciceSingleResolved);
  });

  test("postNewExercices : test d'entrer plusieurs exos", async () => {
    mockRepo.postNewExercices.mockResolvedValueOnce(newListeExerciceMultipleResolved);
    const requestResult = await ExerciceService.postNewExercices(
      newListeExerciceMultiple as ExerciceComplet[],
    );
    expect(requestResult).toBeDefined();
    expect(requestResult).toEqual(newListeExerciceMultipleResolved);
  });

  test("postNewExercices : test d'entrer une liste vide", async () => {
    mockRepo.postNewExercices.mockResolvedValueOnce([]);
    const requestResult = await ExerciceService.postNewExercices([]);
    expect(requestResult).toBeDefined();
    expect(requestResult).toStrictEqual([]);
  });

  test("postNewExercices : test d'entrer 'rien'", async () => {
    mockRepo.postNewExercices.mockResolvedValueOnce([]);
    try {
      await ExerciceService.postNewExercices(null as unknown as ExerciceComplet[]);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
    try {
      await ExerciceService.postNewExercices(undefined as unknown as ExerciceComplet[]);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
