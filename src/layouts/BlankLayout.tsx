import { Navbar, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ImagePath } from '../shared/constants/AssetsPath';
import Footer from './Footer';

export default function BlankLayout() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container>
          <div className='d-flex'>
            <Navbar.Brand href='/'><img src={ImagePath.REACT_LOGO} alt="LOGO" className='me-2' /><strong>Layar Tancap</strong></Navbar.Brand>
          </div>
        </Container>
      </Navbar>
      <Container className='w-100' style={{ paddingBottom: '120px' }}>
        <Outlet />
      </Container>
      <Footer customClass="fixed-bottom" />
    </>
  )
}