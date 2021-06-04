import {Navbar, Container} from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar className="top-nav" bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">HOME</Navbar.Brand>
    </Navbar>
  )
}

export default Navigation;