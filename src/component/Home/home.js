import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home(){
    return(
        
      <div>
        
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">My Website</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
         </Navbar>
          {/* Hero Section */}
      <header>
        <Container>
          <h1>Welcome to My Website</h1>
          <p>This is a simple homepage created using React-Bootstrap.</p>
        </Container>
      </header>

      {/* Content Section */}
      <Container>
        <h2>Featured Content</h2>
        <p>
          Here you can add your featured content, images, text, and other elements.
        </p>
      </Container>

      </div>
      
    )
}
export default Home;