import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="panel"><p className="eyebrow">ERROR 404</p><h1>Página no encontrada</h1><p>Este expediente no existe.</p><Link to="/">Volver al inicio</Link></section>;
}
