import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { characters } from '../data/characters.mock';
import { useApp } from '../context/AppContext';
import MediaPanel from '../components/MediaPanel';
import NotFound from './NotFound';

export default function CharacterDetail() {
  const { id } = useParams();
  const character = characters.find(item => item.id === id);
  const { affinity, increaseAffinity, favorites, toggleFavorite } = useApp();
  if (!character) return <NotFound />;
  return <>
    <Link to="/personajes" className="back-link">← Volver a personajes</Link>
    <section className="detail-heading"><p className="eyebrow">EXPEDIENTE {character.number} / {character.category}</p>
      <h1>{character.name}</h1><p className="hero-copy">{character.short}</p>
      <Button variant="outline-secondary" aria-pressed={favorites.includes(id)} onClick={() => toggleFavorite(id)}>
        {favorites.includes(id) ? 'Quitar de favoritos' : 'Guardar guía'}
      </Button>
    </section>
    <Row className="g-4">
      <Col lg={5}><MediaPanel key={id} character={character} /></Col>
      <Col lg={7}>
        <section className="panel"><h2>Características</h2><Table responsive>
          <thead><tr><th>Atributo</th><th>Valor</th></tr></thead>
          <tbody>{character.attributes.map(([label, value]) => <tr key={label}><td>{label}</td><td>{value}</td></tr>)}</tbody>
        </Table>
          <p>Afinidad con {character.name}: <strong aria-live="polite">{affinity[id] || 0}</strong></p>
          <Button onClick={() => increaseAffinity(id)}>Subir afinidad +1</Button>
        </section>
        <section className="panel"><h2>Guía para comenzar</h2><p>{character.description}</p>
          <ol className="guide-steps">{character.tips.map(tip => <li key={tip}>{tip}</li>)}</ol>
          <details><summary>Dato curioso</summary><p className="mt-3">{character.fact}</p></details>
        </section>
      </Col>
    </Row>
  </>;
}
