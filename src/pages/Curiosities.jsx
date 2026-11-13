import { Row, Col } from 'react-bootstrap';
import { facts } from '../data/characters.mock';

export default function Curiosities() {
  return <section><p className="eyebrow">MÁS ALLÁ DEL COMBATE</p><h1>Datos curiosos</h1>
    <p className="muted">Un pequeño archivo para conocer el mundo del juego.</p>
    <Row className="g-4 mt-2">{facts.map((fact, index) => <Col md={6} key={fact.title}>
      <article className="panel h-100"><p className="eyebrow">NOTA / {String(index + 1).padStart(2, '0')}</p>
        <h2 className="h4">{fact.title}</h2><p>{fact.text}</p>
        {fact.source && <a href={fact.source}>Consultar fuente oficial ↗</a>}
      </article></Col>)}</Row>
  </section>;
}
