import { Button, Card } from 'react-bootstrap';
import { formatPrice } from '../../data/plushies.mock';

export default function ProductCard({ product, onAdd }) {
  return <Card as="article" className="product-card h-100">
    <Card.Img variant="top" src={product.image} alt={product.name} loading="lazy" />
    <Card.Body className="d-flex flex-column">
      <Card.Title as="h2">{product.name}</Card.Title>
      <Card.Text className="muted">{formatPrice(product.price)}</Card.Text>
      <Button className="mt-auto" onClick={onAdd} aria-label={`Agregar ${product.name} al carrito`}>
        Agregar al carrito
      </Button>
    </Card.Body>
  </Card>;
}
