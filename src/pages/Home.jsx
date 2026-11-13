import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { characters } from '../data/characters.mock';
import CharacterGrid from '../components/CharacterGrid';

export default function Home() {
  return <>
    <section className="hero">
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <p className="eyebrow">{site.kicker}</p>
          <h1>{site.title}</h1>
          <p className="hero-copy">{site.description}</p>
          <div className="d-flex flex-wrap gap-3">
            <Button as={Link} role="link" to="/personajes">Explorar las guías <span aria-hidden="true">↗</span></Button>
            <Button as={Link} role="link" to="/curiosidades" variant="outline-secondary">Datos curiosos</Button>
          </div>
          <div className="hero-stats"><span><strong>{characters.length}</strong> personajes</span><span><strong>01</strong> archivo de fans</span></div>
        </Col>
        <Col lg={5}><div className="hero-art">
          <img src={site.heroImage} alt={site.heroAlt} />
          <span className="art-caption">{site.heroCaption}</span>
        </div></Col>
      </Row>
    </section>
    <section><div className="section-heading"><div><p className="eyebrow">ARCHIVO / 01</p><h2>Elige tu próxima guía</h2></div>
      <Link to="/personajes">Ver todos →</Link></div>
      <CharacterGrid items={characters.slice(0, 3)} />
    </section>
    <section className="panel intro-panel"><Row className="g-4"><Col md={4}><p className="eyebrow">ANTES DE EMPEZAR</p><h2>{site.introTitle}</h2></Col>
      <Col md={8}><p>{site.intro}</p><Link to="/contacto">Sugerir una nueva guía →</Link></Col></Row></section>
  </>;
}
