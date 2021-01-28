import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getUserCocktails } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const MyCocktailsScreen = ({ history }) => {

    const userGetCocktails = useSelector(state => state.userGetCocktails);
    const { loading, error, cocktails, oneShort } = userGetCocktails;

    const userLogin = useSelector(state => state.userLogin);
    const { loading: loginLoading, error: loginErorr, userInfo } = userLogin;

    const dispatch = useDispatch()
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        dispatch(getUserCocktails())
    }, [dispatch, history, userInfo])

    return (
        <>
            {loginLoading ? <Loader /> : (
                loading ? <Loader /> :
                    error ? (
                        <>
                            <Message variant='danger'>{error}</Message>
                            <Link className='btn btn-light my-3' to='/ingredients'>Add some new ingredients to your bar</Link>
                        </>) : (
                            loginErorr ? (<Message variant='danger'>{loginErorr}</Message>) : (
                                <>
                                    <h2 className='text-center'>{`${userInfo.name}`}'s Cocktails</h2>
                                    <ListGroup variant='flush'>
                                        {cocktails.map((c) => (
                                            <ListGroupItem key={c._id}>
                                                <Row>
                                                    <Col md={2} xs={4}>
                                                        <Image src={`${c.image}`} alt={c.name} fluid roundedCircle />
                                                    </Col>
                                                    <Col md={1} xs={3}><h3><Link to={`/cocktails/${c.cocktail}`}><strong>{c.name}</strong></Link></h3></Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}

                                    </ListGroup>
                                    <hr className='m-3' />

                                    {oneShort.length > 0 && (
                                        <Col xs={14}>
                                            <h4 className='text-center'>Cocktails you need one more ingredient to make</h4>
                                            <h5 className='text-center'>Better go get it fast...</h5>
                                            <ListGroup variant='flush'>
                                                {oneShort.map((c) => (
                                                    <ListGroupItem key={c.cocktail._id}>
                                                        <Row>
                                                            <Col md={2} xs={3}>
                                                                <Image src={`${c.cocktail.image}`} alt={c.cocktail.name} fluid roundedCircle />
                                                            </Col>
                                                            <Col md={3} xs={6} style={{ 'font-size': '1.4em', 'font-weight': 'bold' }} className='text-center my-3'><Link to={`/cocktails/${c.cocktail._id}`}><strong>{c.cocktail.name}</strong></Link></Col>
                                                            <Col md={2} xs={3} style={{ 'font-size': '1em' }} className='mr-2  my-3 text-left'>Missing Ingredient: </Col>
                                                            <Col md={1} xs={3} className='my-3'><Image style={{ height: '55px' }} src={`${c.ingredient.image}`} alt={c.ingredient.name} fluid roundedCircle /> </Col>
                                                            <Col md={1} xs={3} className='mr-3 my-3 text-left'>{c.ingredient.name}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>

                                        </Col>
                                    )}

                                </>
                            ))
            )}
        </>
    )
}

export default MyCocktailsScreen
