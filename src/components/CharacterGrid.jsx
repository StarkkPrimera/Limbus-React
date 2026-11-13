import { Row, Col } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import CharacterCard from './CharacterCard';

export default function CharacterGrid({ items }) {
  const { favorites, toggleFavorite } = useApp();
  if (items.length === 0) return <p className="panel" role="status">No hay personajes para mostrar. Prueba otra búsqueda o guarda una guía.</p>;
  return <Row className="g-4">{items.map(character => <Col key={character.id} xs={12} sm={6} lg={4}>
    <CharacterCard character={character} favorite={favorites.includes(character.id)} onFavorite={toggleFavorite} />
  </Col>)}</Row>;
}
