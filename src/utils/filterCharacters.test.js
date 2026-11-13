import { filterCharacters, getCategories } from './filterCharacters';

// Datos propios de la prueba: no dependen del archivo characters.mock.js.
const sample = [
  { id: 'a', name: 'Alfa', short: 'Primera letra', category: 'Uno' },
  { id: 'b', name: 'Beta', short: 'Segunda letra', category: 'Dos' },
  { id: 'c', name: 'Gamma', short: 'Tercera', category: 'Uno' }
];

describe('filterCharacters', () => {
  test('sin filtros devuelve la lista completa', () => {
    expect(filterCharacters(sample)).toHaveLength(3);
  });

  test('busca sin distinguir mayúsculas y recortando espacios', () => {
    expect(filterCharacters(sample, { search: '  ALF ' }).map(item => item.id)).toEqual(['a']);
  });

  test('también busca dentro de la descripción corta', () => {
    expect(filterCharacters(sample, { search: 'segunda' }).map(item => item.id)).toEqual(['b']);
  });

  test('filtra por categoría exacta', () => {
    expect(filterCharacters(sample, { category: 'Uno' }).map(item => item.id)).toEqual(['a', 'c']);
  });

  test('solo deja los ids que están en favoritos', () => {
    expect(filterCharacters(sample, { favorites: ['b', 'c'] }).map(item => item.id)).toEqual(['b', 'c']);
    expect(filterCharacters(sample, { favorites: [] })).toEqual([]);
  });

  test('combina búsqueda, categoría y favoritos', () => {
    const result = filterCharacters(sample, { search: 'a', category: 'Uno', favorites: ['c'] });
    expect(result.map(item => item.id)).toEqual(['c']);
  });
});

describe('getCategories', () => {
  test('agrega "Todas" y no repite categorías', () => {
    expect(getCategories(sample)).toEqual(['Todas', 'Uno', 'Dos']);
  });
});
