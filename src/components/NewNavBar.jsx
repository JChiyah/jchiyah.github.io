// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';

// const NavigationBar = () => {
//     const location = useLocation();

//     return (
//         <Navbar expand="lg" className="bg-body-tertiary">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">Your Brand</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link
//                             as={Link}
//                             to="/"
//                             active={location.pathname === '/'}
//                         >
//                             Home
//                         </Nav.Link>
//                         <Nav.Link
//                             as={Link}
//                             to="/about"
//                             active={location.pathname === '/about'}
//                         >
//                             About
//                         </Nav.Link>
//                         <Nav.Link
//                             as={Link}
//                             to="/publications"
//                             active={location.pathname === '/publications'}
//                         >
//                             Publications
//                         </Nav.Link>
//                         <Nav.Link
//                             as={Link}
//                             to="/contact"
//                             active={location.pathname === '/contact'}
//                         >
//                             Contact
//                         </Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default NavigationBar;
