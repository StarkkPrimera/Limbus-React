import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/plushies.mock';

export default function Cart() {
  const { cartItems, cartTotal, addToCart, decreaseQuantity, removeFromCart, clearCart } = useApp();

  return <>
    <h1>Carrito</h1>
    {cartItems.length === 0 ? <div className="panel">
      <p>Tu carrito está vacío.</p>
      <Link className="btn btn-primary" to="/tienda">Ir a la tienda</Link>
    </div> : <>
      <ul className="cart-items">
        {cartItems.map(({ id, name, image, price, quantity }) => <li key={id} className="panel cart-item">
          <img src={image} alt="" width="76" height="76" />
          <div>
            <h2>{name}</h2>
            <p className="muted mb-0">{formatPrice(price)} por unidad</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-secondary" onClick={() => decreaseQuantity(id)} disabled={quantity === 1}
              aria-label={`Restar una unidad de ${name}`}>−</Button>
            <span>{quantity}</span>
            <Button variant="outline-secondary" onClick={() => addToCart(id)}
              aria-label={`Sumar una unidad de ${name}`}>+</Button>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <strong>{formatPrice(price * quantity)}</strong>
            <Button variant="outline-secondary" onClick={() => removeFromCart(id)}
              aria-label={`Quitar ${name} del carrito`}>Quitar</Button>
          </div>
        </li>)}
      </ul>
      <div className="panel cart-summary">
        <Link className="btn btn-outline-secondary" to="/tienda">Seguir comprando</Link>
        <Button variant="outline-secondary" onClick={clearCart}>Vaciar carrito</Button>
        <p className="cart-total mb-0" role="status">Total {formatPrice(cartTotal)}</p>
      </div>
    </>}
  </>;
}
