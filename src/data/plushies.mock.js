export const plushies = [
  { id: 'faust', name: 'Peluche de Faust', price: 16990, image: '/assets/plushies/faust.webp' },
  { id: 'don-quixote', name: 'Peluche de Don Quixote', price: 15990, image: '/assets/plushies/don-quixote.webp' },
  { id: 'ishmael', name: 'Peluche de Ishmael', price: 17990, image: '/assets/plushies/ishmael.webp' },
];

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

export function formatPrice(price) {
  return clp.format(price);
}
