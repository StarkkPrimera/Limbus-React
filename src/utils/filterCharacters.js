// Lógica pura (sin React): recibe datos y devuelve datos.
// Al estar separada de la página, se puede probar sin renderizar nada.

/**
 * Filtra la lista de personajes.
 * @param {Array} list        personajes a filtrar
 * @param {Object} options
 * @param {string} options.search     texto a buscar en nombre y descripción corta
 * @param {string} options.category   'Todas' o el nombre exacto de una categoría
 * @param {Array|null} options.favorites  ids favoritos; null = no filtrar por favoritos
 */
export function filterCharacters(list, { search = '', category = 'Todas', favorites = null } = {}) {
  const term = search.trim().toLowerCase();
  return list.filter(item =>
    (favorites === null || favorites.includes(item.id))
    && `${item.name} ${item.short}`.toLowerCase().includes(term)
    && (category === 'Todas' || item.category === category));
}

// Opciones del <select>: 'Todas' + categorías sin repetir (Set elimina duplicados).
export function getCategories(list) {
  return ['Todas', ...new Set(list.map(item => item.category))];
}
