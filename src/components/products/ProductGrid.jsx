import { Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function ProductGrid({ items, onAdd }) {
  return <Row xs={1} sm={2} lg={3} className="g-3">
    {items.map(product => <Col key={product.id}>
      <ProductCard product={product} onAdd={() => onAdd(product.id)} />
    </Col>)}
  </Row>;
}
