import './Layout.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { ImagePath } from '../shared/constants/AssetsPath';
import { FormEvent, useContext, useRef, useState } from 'react';
import Footer from './Footer';
import { fetchMovies } from '../shared/services/SharedService';
import { Movie } from '../shared/interfaces/MovieModel';
import { CartContext } from '../shared/states/CartContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartModal from '../shared/components/CartModal';

export default function AdminLayout() {

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showList, setShowList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function HandleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent refresh
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get('keyword') as string;
    fetchMoviesData(keyword);
    console.log(keyword);
  }

  const fetchMoviesData = async (keyword: string) => {
    setError(null);
    try {
      const result = await fetchMovies(keyword);
      setSearchResults(result.Search || []);
      setShowList(true)
      console.log(result);
    } catch (err) {
      setError('Failed to load movies');
    }
  };

  const navigate = useNavigate();

  function goToDetail(id: string) {
    setShowList(false);
    navigate('/movie/' + id)
  }

  function logout() {
    navigate('')
  }

  const { items } = useContext(CartContext);

  const modal = useRef<any>();
  const cartQuantity = items.length;
  function handleOpenCartClick() {
    modal.current.open();
  }
  let modalActions = <Button variant="secondary" onClick={()=>(modal.current.close())}>Close</Button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <Button variant="secondary" onClick={()=>(modal.current.close())}>Close</Button>
        <Button variant='danger'>Checkout</Button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        // cartItems={cart.items} no longer needed because the modal can have these values by using the useContext
        // onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
      >{modalActions}</CartModal>
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container>
          <div className='d-flex'>
            <Navbar.Brand href='/'><img src={ImagePath.REACT_LOGO} alt="LOGO" className='me-2' /><strong>Layar Tancap</strong></Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex gap-1">
              <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
              <NavLink to="/movie" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Movies</NavLink>
              <Button variant='warning text-white' onClick={handleOpenCartClick}><FontAwesomeIcon icon={faCartShopping} />&nbsp;({cartQuantity})</Button>
              <NavDropdown title="Option" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  Settings
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={HandleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="keyword"
              />
              <Button variant="outline-success" type='submit'>Search</Button>
              {showList && searchResults.length > 0 && (
                <Dropdown.Menu
                  show
                  className="w-100 position-absolute mt-1"
                  style={{ zIndex: 1050 }}
                >
                  {searchResults.map((result, index) => (
                    <Dropdown.Item key={index} onClick={() => (goToDetail(result.imdbID))}>{result.Title}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='w-100 pb-5'>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}