import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Characters from '../pages/Characters';
import CharacterDetail from '../pages/CharacterDetail';
import Curiosities from '../pages/Curiosities';
import Contact from '../pages/Contact';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import { useApp } from '../context/AppContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function AppRoutes() {
  const { storageError } = useApp();
  return <BrowserRouter><ScrollToTop /><a className="skip-link" href="#main">Ir al contenido</a><NavBar />
    <Container as="main" id="main">
      {storageError && <Alert variant="warning">Los cambios se conservan solo durante esta sesión: el navegador no permitió guardarlos.</Alert>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personajes" element={<Characters />} />
        <Route path="/personajes/:id" element={<CharacterDetail />} />
        <Route path="/favoritos" element={<Characters onlyFavorites />} />
        <Route path="/curiosidades" element={<Curiosities />} />
        <Route path="/tienda" element={<Products />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container><Footer />
  </BrowserRouter>;
}
