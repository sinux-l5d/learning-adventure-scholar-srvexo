import { ExerciceComplet } from '@type/exercice/ExerciceComplet';
import { FilterQuery } from 'mongoose';

/**
 * Convertit les filtres du format express au format mongoose
 * @param filters filtres au format d'express
 * @returns FilterQuery<ExerciceComplet> filtes au format mongoose
 */
export function convertFiltersExpressToMangoose(
  filters: qs.ParsedQs,
): FilterQuery<ExerciceComplet> {
  for (const key in filters) {
    if (filters[key] instanceof Array) {
      filters[key] = { $all: filters[key] };
    }
  }
  return filters;
}
