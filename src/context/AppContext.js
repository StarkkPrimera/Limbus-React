import { createContext, useContext, useEffect, useState } from 'react';
import { readData, saveData } from '../data/storage';
import { plushies } from '../data/plushies.mock';
import { site } from '../data/site';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => readData('dark', site.dark));
  const [favorites, setFavorites] = useState(() => readData('favorites', []));
  const [affinity, setAffinity] = useState(() => readData('affinity', {}));
  const [cart, setCart] = useState(() => {
    const saved = readData('cart', {});
    return Object.fromEntries(plushies
      .map(({ id }) => [id, saved?.[id]])
      .filter(([, quantity]) => Number.isSafeInteger(quantity) && quantity > 0));
  });
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const results = [saveData('dark', dark), saveData('favorites', favorites),
      saveData('affinity', affinity), saveData('cart', cart)];
    setStorageError(results.includes(false));
  }, [dark, favorites, affinity, cart]);

  function toggleFavorite(id) {
    setFavorites(current => current.includes(id)
      ? current.filter(item => item !== id) : [...current, id]);
  }

  function increaseAffinity(id) {
    setAffinity(current => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function addToCart(id) {
    setCart(current => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function decreaseQuantity(id) {
    setCart(current => current[id] > 1
      ? { ...current, [id]: current[id] - 1 } : current);
  }

  function removeFromCart(id) {
    setCart(current => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  const cartItems = plushies.filter(({ id }) => cart[id])
    .map(product => ({ ...product, quantity: cart[product.id] }));
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return <AppContext.Provider value={{ dark, setDark, favorites, toggleFavorite,
    affinity, increaseAffinity, storageError, cartItems, cartCount, cartTotal,
    addToCart, decreaseQuantity, removeFromCart, clearCart }}>
    {children}
  </AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe estar dentro de AppProvider');
  return context;
}
