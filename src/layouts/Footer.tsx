import { Navbar, Container } from 'react-bootstrap';

export default function Footer({customClass}:any) {
  return (
    <>
      <Navbar expand="lg" className={'bg-body-tertiary '+customClass}>
        <Container>
          <div className='d-flex align-items-center justify-content-center w-100 gap-5'>
            <Navbar.Brand>Layar Tancap</Navbar.Brand>
            <div className='credit d-flex align-items-center gap-5'>
              <span>Photo by:&nbsp;<a href="https://www.pexels.com/@tima-miroshnichenko/">&nbsp;Tima Miroshnichenko&nbsp;</a>&nbsp;from Pexels</span>
              <span>Movie data provided by:&nbsp;<a href="https://www.omdbapi.com/">&nbsp;OMDb API</a></span>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}