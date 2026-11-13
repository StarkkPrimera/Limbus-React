import { fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';
import { site } from '../data/site';

const cartKey = `${site.storageKey}-cart`;

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, '', '/');
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

function addFaust() {
  fireEvent.click(screen.getByRole('button', { name: 'Agregar Peluche de Faust al carrito' }));
}

function openCart() {
  fireEvent.click(screen.getByRole('link', { name: /^Carrito/ }));
}

test('muestra el catálogo de peluches y el carrito vacío permite volver a la tienda', () => {
  render(<App />);
  openCart();
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Ir a la tienda' }));
  expect(screen.getByRole('heading', { name: 'Tienda de peluches' })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /^Agregar Peluche de/ })).toHaveLength(3);
});

test('agrega peluches, agrupa los repetidos y actualiza el contador y total', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Tienda' }));

  addFaust();
  addFaust();
  fireEvent.click(screen.getByRole('button', { name: 'Agregar Peluche de Ishmael al carrito' }));

  expect(screen.getByRole('link', { name: 'Carrito 3' })).toBeInTheDocument();
  openCart();
  const rows = within(screen.getByRole('list')).getAllByRole('listitem');
  expect(rows).toHaveLength(2);
  expect(within(rows[0]).getByRole('heading', { name: 'Peluche de Faust' })).toBeInTheDocument();
  expect(within(rows[0]).getByText('2')).toBeInTheDocument();
  expect(within(rows[0]).getByText('$33.980')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Total $51.970');
});

test('permite cambiar cantidades, quitar un producto y vaciar el carrito', () => {
  localStorage.setItem(cartKey, JSON.stringify({ faust: 1, ishmael: 1 }));
  window.history.replaceState({}, '', '/carrito');
  render(<App />);

  const subtract = screen.getByRole('button', { name: 'Restar una unidad de Peluche de Faust' });
  expect(subtract).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Sumar una unidad de Peluche de Faust' }));
  expect(screen.getByRole('status')).toHaveTextContent('Total $51.970');
  fireEvent.click(subtract);
  expect(subtract).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent('Total $34.980');

  fireEvent.click(screen.getByRole('button', { name: 'Quitar Peluche de Faust del carrito' }));
  expect(screen.queryByRole('heading', { name: 'Peluche de Faust' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Total $17.990');
  expect(screen.getByRole('link', { name: 'Carrito 1' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Carrito 0' })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(cartKey))).toEqual({});
});

test('recupera los peluches guardados al volver a cargar la aplicación', () => {
  window.history.replaceState({}, '', '/tienda');
  const { unmount } = render(<App />);
  addFaust();
  expect(JSON.parse(localStorage.getItem(cartKey))).toEqual({ faust: 1 });

  unmount();
  window.history.replaceState({}, '', '/carrito');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Peluche de Faust' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Total $16.990');
});

test('descarta productos desconocidos y cantidades inválidas guardadas', () => {
  localStorage.setItem(cartKey, JSON.stringify({ faust: 0, ishmael: -1, 'don-quixote': '2', desconocido: 4 }));
  window.history.replaceState({}, '', '/carrito');
  render(<App />);
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Carrito 0' })).toBeInTheDocument();
});
