import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Datos y eventos llegan desde la página mediante props.
export default function CharacterCard({ character, favorite, onFavorite }) {
  return <Card as="article" className="character-card h-100">
    <div className="character-art">
      <span className="file-number">EXP. {character.number}</span>
      <img src={character.image} alt={character.name} loading="lazy"
        onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/assets/placeholder.svg'; }} />
    </div>
    <Card.Body className="d-flex flex-column">
      <p className="eyebrow">{character.category}</p>
      <Card.Title as="h3">{character.name}</Card.Title>
      <Card.Text className="muted flex-grow-1">{character.short}</Card.Text>
      <div className="d-flex flex-wrap gap-2">
        <Button as={Link} role="link" to={`/personajes/${character.id}`} variant="primary">Leer guía <span aria-hidden="true">↗</span></Button>
        <Button variant="outline-secondary" aria-pressed={favorite}
          aria-label={`${favorite ? 'Quitar' : 'Guardar'} ${character.name} en favoritos`}
          onClick={() => onFavorite(character.id)}>{favorite ? '★' : '☆'}</Button>
      </div>
    </Card.Body>
  </Card>;
}
