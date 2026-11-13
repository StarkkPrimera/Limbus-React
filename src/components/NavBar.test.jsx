import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { useApp } from '../context/AppContext';

jest.mock('../context/AppContext', () => ({ useApp: jest.fn() }));

const setDark = jest.fn();

function setup(context = {}) {
  useApp.mockReturnValue({ dark: true, setDark, favorites: [], cartCount: 0, ...context });
  render(<MemoryRouter><NavBar /></MemoryRouter>);
}

describe('NavBar', () => {
  test('muestra los enlaces principales con su ruta', () => {
    setup();
    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Personajes' })).toHaveAttribute('href', '/personajes');
    expect(screen.getByRole('link', { name: 'Curiosidades' })).toHaveAttribute('href', '/curiosidades');
    expect(screen.getByRole('link', { name: /^Favoritos/ })).toHaveAttribute('href', '/favoritos');
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto');
  });

  test('incluye el botón de hamburguesa para pantallas pequeñas', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeInTheDocument();
  });

  test('en modo oscuro el botón ofrece "Modo claro" y al pulsarlo llama a setDark(false)', () => {
    setup({ dark: true });
    fireEvent.click(screen.getByRole('button', { name: 'Modo claro' }));
    expect(setDark).toHaveBeenCalledWith(false);
  });

  test('en modo claro el botón ofrece "Modo oscuro"', () => {
    setup({ dark: false });
    expect(screen.getByRole('button', { name: 'Modo oscuro' })).toBeInTheDocument();
  });

  test('muestra la cantidad de favoritos solo si hay alguno', () => {
    setup({ favorites: ['a', 'b'] });
    expect(screen.getByRole('link', { name: 'Favoritos 2' })).toBeInTheDocument();
  });

  test('sin favoritos no muestra el contador', () => {
    setup({ favorites: [] });
    expect(screen.getByRole('link', { name: 'Favoritos' })).toBeInTheDocument();
  });
});
