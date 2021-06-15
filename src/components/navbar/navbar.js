import {Navbar} from 'react-bootstrap';
import Login from '../../auth/login.js'

function Navigation() {
  return (
    <Navbar className="top-nav" bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">HOME</Navbar.Brand>
      <Login />
    </Navbar>
  )
}

export default Navigation;

