// import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { ExerciceService } from '@services/exercice.service';
import * as repo from '@repositories/exercice.repo';

jest.mock('@repositories/exercice.repo');

const mockRepo = repo as unknown as jest.Mocked<typeof repo>;

describe('service exercice', () => {
  test('findExerciceWithFilter : test de recuperer un exercice sans filtre', async () => {
    mockRepo.getAllExercicesWithFilters.mockResolvedValueOnce([
      // mettre un tableau avec plus d'élément et dans une constant
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
    ]);

    const exo = await ExerciceService.getExercicesWithFilters({});
    expect(exo).toBeDefined();

    // pour les tests verifier vide erreur quand tableau vide dans le mock
    //
  });
});
