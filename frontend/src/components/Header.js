import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
    return (
        <Navbar bg="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand ><i className='fas fa-cocktail'></i> MyBar</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/login'>
                            <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/cocktails'>
                            <Nav.Link > Cocktails </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/ingredients'>
                            <Nav.Link > Ingredients</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
