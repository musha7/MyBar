import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { getCocktailById } from '../actions/cocktailActions'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

function SingleCocktailScreen({ match }) {

    const cocktailById = useSelector(state => state.cocktailById);
    const { loading, error, cocktail } = cocktailById;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCocktailById(match.params.id))
    }, [dispatch, match])

    return (
        <>
            <Link className='btn btn-dark my-3' to='/cocktails' >Go Back</Link>
            {loading && <Loader />}
            {error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <h1> {cocktail.name} </h1>
                    <Row>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroupItem><Image src={cocktail.image} alt={cocktail.name} fluid /></ListGroupItem>
                                <ListGroupItem><Rating value={cocktail.rating} text={`${cocktail.numReviews} reviews`} /></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <h3> Ingredients</h3>
                            <ListGroup>
                                {cocktail.ingredients.map((ing, index) => (
                                    <ListGroupItem key={index} >
                                        <Row >
                                            <Col>{index + 1}. {ing.name}</Col>
                                            <Col><Image style={{ height: '50px' }} src={ing.image} alt={ing.name} fluid /></Col>
                                        </Row>

                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <h3>Steps</h3>
                            <ListGroup>
                                {cocktail.steps.map((s, index) => (
                                    <ListGroupItem>{`${index + 1}. ${s}`}</ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}

        </>
    )
}

export default SingleCocktailScreen
