import React, { useEffect } from 'react'
import { Carousel, Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getTopRatedCocktails } from '../actions/cocktailActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';


const HomeScreen = () => {
    const cocktailTopRated = useSelector(state => state.cocktailTopRated);
    const { loading: cocktailTopRatedLoading, error: cocktailTopRatedError, cocktails: topCocktails } = cocktailTopRated;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopRatedCocktails())
    }, [dispatch])

    return (
        <>
            <h1 className="text-center">Welcome to MyBar!</h1>
            {cocktailTopRatedLoading ? <Loader /> :
                cocktailTopRatedError ? (<Message variant='danger'>{cocktailTopRatedError}</Message>) : (
                    <Row className="justify-content-center m-3">
                        <Col md={4} className="mr-3">
                            <h3>Our top cocktails</h3>
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
                        <Col md={3}>
                            <h3> Most used Ingredients</h3>
                            {/* <ListGroup >
                                        {cocktail.ingredients.map((ing, index) => (
                                            <ListGroupItem key={ing.ingredient} >
                                                <Row >
                                                    <Col>{index + 1}. {ing.name}</Col>
                                                    <Col><Image style={{ height: '50px' }} src={ing.image} alt={ing.name} fluid /></Col>
                                                </Row>

                                            </ListGroupItem>
                                        ))}
                                    </ListGroup> */}
                        </Col>
                    </Row>

                )}

        </>
    )
}

export default HomeScreen
