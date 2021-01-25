import React, { useEffect } from 'react'
import { Carousel, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getTopRatedCocktails } from '../actions/cocktailActions';
import { getTopUsedIngredientsList } from '../actions/ingredientAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';


const HomeScreen = () => {
    const cocktailTopRated = useSelector(state => state.cocktailTopRated);
    const { loading: cocktailTopRatedLoading, error: cocktailTopRatedError, cocktails: topCocktails } = cocktailTopRated;

    const ingredientTopUsed = useSelector(state => state.ingredientTopUsed);
    const { loading: ingredientTopUsedLoading, error: ingredientTopUsedError, ingredients: topIngredients } = ingredientTopUsed;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopRatedCocktails())
        dispatch(getTopUsedIngredientsList())
    }, [dispatch])

    return (
        <>
            <h1 className="text-center">Welcome to MyBar!</h1>
            <h5 className='text-center'>In this site you can add the ingredients you have at home</h5>
            <h5 className='text-center'>See what cocktails you can make from them, and how to do it</h5>
            <h5 className='text-center mb-3'> Add new cocktails and ingredinets to make our bar as big as possible</h5>

            <Row className="justify-content-center m-3">

                {cocktailTopRatedLoading ? <Loader /> :
                    cocktailTopRatedError ? (<Message variant='danger'>{cocktailTopRatedError}</Message>) : (
                        <Col md={5} className="mr-3">
                            <h4><strong>Our top cocktails</strong></h4>
                            <Carousel >
                                {topCocktails.map((cocktail, index) => (
                                    <Carousel.Item key={index}>
                                        <Link to={`/cocktails/${cocktail._id}`}>
                                            <Image src={cocktail.image} alt={cocktail.name} fluid roundedCircle />
                                        </Link>
                                        <Carousel.Caption>
                                            <h3 style={{ color: 'yellow' }}>{cocktail.name}</h3>
                                            <Rating value={cocktail.rating} text={`${cocktail.numReviews} reviews`} />
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}

                            </Carousel>
                        </Col>
                    )}

                {ingredientTopUsedLoading ? <Loader /> :
                    ingredientTopUsedError ? (<Message variant='danger'>{ingredientTopUsedError}</Message>) : (
                        <Col md={4}>
                            <h4><strong> Most used Ingredients</strong></h4>
                            <ListGroup >
                                {topIngredients.map((ing, index) => (
                                    <ListGroupItem variant='flush' key={index}>
                                        <Row >
                                            <Col className='my-3'>{index + 1}. {ing.name}</Col>
                                            <Col><Image style={{ height: '65px' }} src={ing.image} alt={ing.name} fluid /></Col>

                                        </Row>

                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>)}
            </Row>

        </>
    )
}

export default HomeScreen
