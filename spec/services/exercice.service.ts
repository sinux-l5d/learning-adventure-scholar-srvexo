import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { ExerciceService } from '@services/exercice.service';
import * as repo from '@repositories/exercice.repo';
import { Exercice } from '@db/exercice.db';
import { AppError } from '@helpers/AppError.helper';

jest.mock('@repositories/exercice.repo');

const mockRepo = repo as unknown as jest.Mocked<typeof repo>;

const exercices = [
  {
    id: '1',
    nom: 'les boucles en python',
    difficulte: 4,
    theme: ['boucles'],
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
    theme: ['boucles'],
    langage: 'python',
    correction: 'blabla',
    aides: [],
    auteurs: ['Cam', 'Leon', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

describe('service exercice', () => {
  test('findExerciceWithFilter : test de recuperer un exercice sans filtre', async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercices);

    const exo = await ExerciceService.getExerciceWithFilters({});
    expect(exo).toBeDefined();
    expect(typeof exo).toBe('object');
  });
  test('findExerciceWithFilter : test recuperer un exercice avec des filtres', async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce(exercices);
    const filtres = { auteurs: 'Polux', langage: 'python' };

    const exo = await ExerciceService.getExerciceWithFilters(filtres);

    expect(exo.auteurs).toEqual(expect.arrayContaining([filtres.auteurs]));
    expect(exo.langage).toBe(filtres.langage);
  });
  test("findExerciceWithFilter : test qu'une erreur est bien retourner quand il n'y a pas d'exercice", async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce([]);
    try {
      await ExerciceService.getExerciceWithFilters({});
    } catch (err) {
      expect(err).toThrow(AppError);
    }
  });
});
