import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';

const character = {
  id: 'faust', number: '02', name: 'Faust', category: 'Pecador LCB',
  image: '/assets/faust.png', short: 'Texto corto de prueba'
};

// Props simuladas: la tarjeta no necesita contexto ni datos reales.
function setup(props = {}) {
  const onFavorite = jest.fn();
  render(<MemoryRouter>
    <CharacterCard character={character} favorite={false} onFavorite={onFavorite} {...props} />
  </MemoryRouter>);
  return { onFavorite };
}

describe('CharacterCard', () => {
  test('muestra los datos recibidos por props', () => {
    setup();
    expect(screen.getByRole('heading', { level: 3, name: 'Faust' })).toBeInTheDocument();
    expect(screen.getByText('EXP. 02')).toBeInTheDocument();
    expect(screen.getByText('Pecador LCB')).toBeInTheDocument();
    expect(screen.getByText('Texto corto de prueba')).toBeInTheDocument();
  });

  test('el enlace "Leer guía" apunta a la ruta del personaje', () => {
    setup();
    expect(screen.getByRole('link', { name: /Leer guía/ })).toHaveAttribute('href', '/personajes/faust');
  });

  test('con favorite=false ofrece guardar el personaje', () => {
    setup({ favorite: false });
    const button = screen.getByRole('button', { name: 'Guardar Faust en favoritos' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveTextContent('☆');
  });

  test('con favorite=true ofrece quitarlo', () => {
    setup({ favorite: true });
    const button = screen.getByRole('button', { name: 'Quitar Faust en favoritos' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('★');
  });

  test('al pulsar la estrella llama a onFavorite con el id', () => {
    const { onFavorite } = setup();
    fireEvent.click(screen.getByRole('button', { name: /en favoritos/ }));
    expect(onFavorite).toHaveBeenCalledTimes(1);
    expect(onFavorite).toHaveBeenCalledWith('faust');
  });

  test('si la imagen falla se reemplaza por el placeholder', () => {
    setup();
    const image = screen.getByAltText('Faust');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '/assets/placeholder.svg');
  });
});
