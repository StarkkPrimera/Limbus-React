import { Container } from 'react-bootstrap';
import { site } from '../data/site';

export default function Footer() {
  return <footer><Container className="d-flex flex-wrap justify-content-between gap-2">
    <span>{site.brand}{' // '}Archivo de guías · Por TusPadres</span>
  </Container></footer>;
}
