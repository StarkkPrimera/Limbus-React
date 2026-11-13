import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { plushies } from '../data/plushies.mock';
import ProductGrid from '../components/products/ProductGrid';

export default function Products() {
  const { addToCart, cartCount } = useApp();
  const [lastAdded, setLastAdded] = useState('');

  function handleAdd(id) {
    addToCart(id);
    setLastAdded(plushies.find(product => product.id === id).name);
  }

  return <>
    <h1>Tienda de peluches</h1>
    <p className="muted">Catálogo de demostración de Limbus Company. Precios en CLP.</p>
    <p role="status" className="shop-status muted">
      {lastAdded && `${lastAdded} agregado al carrito. Unidades en el carrito: ${cartCount}.`}
    </p>
    <ProductGrid items={plushies} onAdd={handleAdd} />
  </>;
}
