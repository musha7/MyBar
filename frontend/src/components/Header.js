import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';


const Header = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch()

    const logoutPressed = () => {
        dispatch(logout())
    }

    return (
        <Navbar bg="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand ><i className='fas fa-cocktail'></i> MyBar</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                <LinkContainer to='/users/myCocktails'>
                                    <NavDropdown.Item >
                                        My Cocktails
                                </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/users/myIngredients'>
                                    <NavDropdown.Item >
                                        My Ingredients
                                </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/users/profile'>
                                    <NavDropdown.Item >
                                        Profile
                                </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to='/'>
                                    <NavDropdown.Item onClick={logoutPressed}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>) :
                            (
                                <LinkContainer to='/login'>
                                    <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>
                            )}

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
