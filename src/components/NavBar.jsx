import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { site } from '../data/site';

export default function NavBar() {
  const { dark, setDark, favorites, cartCount } = useApp();
  return <Navbar expand="xl" className="site-nav" sticky="top">
    <Container>
      <Navbar.Brand as={Link} to="/" className="brand">{site.brand}<span>{' // '}</span>GUÍA</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" label="Abrir menú" />
      <Navbar.Collapse id="main-nav">
        <Nav className="ms-auto align-items-xl-center gap-xl-2">
          <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/personajes">Personajes</Nav.Link>
          <Nav.Link as={NavLink} to="/curiosidades">Curiosidades</Nav.Link>
          <Nav.Link as={NavLink} to="/favoritos">Favoritos
            {favorites.length > 0 && <>{' '}<Badge pill bg="secondary">{favorites.length}</Badge></>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          <Nav.Link as={NavLink} to="/tienda">Tienda</Nav.Link>
          <Nav.Link as={NavLink} to="/carrito">Carrito{' '}
            <Badge pill bg="secondary">{cartCount}</Badge>
          </Nav.Link>
          <Button variant="outline-secondary" size="sm" onClick={() => setDark(!dark)}>
            {dark ? 'Modo claro' : 'Modo oscuro'}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}
