import { AppError } from '@helpers/AppError.helper';
import * as repo from '@repositories/exercice.repo';
import { ExerciceService } from '@services/exercice.service';

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
  {
    id: '2',
    nom: 'Hello World',
    difficulte: 2,
    theme: ['boucles'],
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
    theme: ['boucles'],
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
    theme: ['boucles'],
    langage: 'c',
    correction: 'blabla',
    aides: [],
    auteurs: ['Gi', 'Raphe', 'Polux'],
    dataset: [],
    enonce: 'blabla',
    template: 'blabla',
  },
];

describe('service exercice', () => {
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
      expect(err).toThrow(AppError); // bon type d'erreur ?
    }
  });
});
