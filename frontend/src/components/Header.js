import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserProfile, logout } from '../actions/userActions';


const Header = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch()

    const logoutPressed = () => {
        dispatch(logout())
    }

    const ingredientsPressed = () => {
        dispatch({ type: 'USER_INGREDIENT_CHANGE_RESET' })
    }
    const profilePressed = () => {
        dispatch(getUserProfile())
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
                            <>
                                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                    <LinkContainer to='/myCocktails'>
                                        <NavDropdown.Item >
                                            My Cocktails
                                </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/myIngredients'>
                                        <NavDropdown.Item onClick={ingredientsPressed}>
                                            My Ingredients
                                </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item onClick={profilePressed}>
                                            Profile
                                </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutPressed}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                <NavDropdown title='Add To Our Bar' id="basic-nav-dropdown">
                                    <LinkContainer to='/addCocktail'>
                                        <NavDropdown.Item >
                                            Add Cocktail
                            </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/addIngredient'>
                                        <NavDropdown.Item >
                                            Add Ingredient
                            </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            </>) :
                            (
                                <LinkContainer to='/login'>
                                    <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>
                            )}

                        <LinkContainer to='/cocktails'>
                            <Nav.Link > Cocktails </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/ingredients'>
                            <Nav.Link onClick={ingredientsPressed}> Ingredients</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
