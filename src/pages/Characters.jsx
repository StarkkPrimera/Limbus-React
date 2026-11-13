import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { characters } from '../data/characters.mock';
import { useApp } from '../context/AppContext';
import CharacterGrid from '../components/CharacterGrid';
import { filterCharacters, getCategories } from '../utils/filterCharacters';

export default function Characters({ onlyFavorites = false }) {
  const { favorites } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const categories = getCategories(characters);
  const list = filterCharacters(characters, {
    search, category, favorites: onlyFavorites ? favorites : null
  });

  return <section>
    <p className="eyebrow">ARCHIVO DE PERSONAJES</p>
    <h1>{onlyFavorites ? 'Mis favoritos' : 'Guías de personajes'}</h1>
    <p className="muted">{onlyFavorites ? 'Tus guías guardadas para volver a consultarlas.' : 'Busca un nombre y abre su expediente.'}</p>
    <Row className="g-3 align-items-end filter-panel">
      <Col md={6}><Form.Label htmlFor="search-character">Buscar personaje</Form.Label>
        <Form.Control id="search-character" value={search} onChange={event => setSearch(event.target.value)} placeholder="Escribe un nombre…" /></Col>
      <Col md={4}><Form.Label htmlFor="category-character">Categoría</Form.Label>
        <Form.Select id="category-character" value={category} onChange={event => setCategory(event.target.value)}>
          {categories.map(item => <option key={item}>{item}</option>)}
        </Form.Select></Col>
      <Col md={2}><Button variant="outline-secondary" onClick={() => { setSearch(''); setCategory('Todas'); }}>Limpiar</Button></Col>
    </Row>
    <p className="muted" role="status">{list.length} resultado(s)</p>
    <CharacterGrid items={list} />
  </section>;
}
