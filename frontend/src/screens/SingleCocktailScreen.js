import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { getCocktailById } from '../actions/cocktailActions'
import { getReviewsForCocktail } from '../actions/reviewActions'
import { Link } from 'react-router-dom';
// import moment from 'moment';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import CocktailReview from '../components/CocktailReview';

function SingleCocktailScreen({ match, history }) {

    const cocktailById = useSelector(state => state.cocktailById);
    const { loading, error, cocktail } = cocktailById;

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { error: userInfoError, userInfo } = userLogin;

    const reviewsByCocktail = useSelector(state => state.reviewsByCocktail);
    const { error: reviewForCocktailError, reviews } = reviewsByCocktail;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else {
            dispatch(getCocktailById(match.params.id))
            dispatch({ type: 'REVIEW_ADD_RESET' })
            dispatch(getReviewsForCocktail(match.params.id))
        }
    }, [dispatch, history, match, userInfo])

    return (
        <>
            <Link className='btn btn-dark my-3' to='/cocktails' >Go Back</Link>
            {loading && <Loader />}
            {error ? (<Message variant='danger'>{error}</Message>) :
                userInfoError ? (<Message variant='danger'>{userInfoError}</Message>) :
                    (
                        <>
                            <h1> {cocktail.name} </h1>
                            <Row className='p-3'>
                                <Col md={4} className='m-2'>
                                    <ListGroup >
                                        <ListGroupItem><Image src={cocktail.image} alt={cocktail.name} fluid rounded /></ListGroupItem>
                                        <ListGroupItem><Rating value={cocktail.rating} text={`${cocktail.numReviews} review${cocktail.numReviews > 1 ? 's' : ''}`} /></ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <h3> Ingredients</h3>
                                    <ListGroup >
                                        {cocktail.ingredients.map((ing, index) => (
                                            <ListGroupItem key={ing.ingredient} >
                                                <Row >
                                                    <Col>{index + 1}. {ing.name}</Col>
                                                    <Col><Image style={{ height: '50px' }} src={ing.image} alt={ing.name} fluid /></Col>
                                                </Row>

                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col md={4} >
                                    <h3>Steps</h3>
                                    <ListGroup >
                                        {cocktail.steps.map((s, index) => (
                                            <ListGroupItem key={index}>{`${index + 1}. ${s}`}</ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <hr />
                            <CocktailReview cocktail={cocktail} />
                            <hr />
                            {reviewForCocktailError ? <Message variant='danger'>{reviewForCocktailError}</Message> :
                                reviews.length === 0 ? <Message variant='light'>No reviews yet, be the first to review!</Message> :
                                    (
                                        <>
                                            <h3>{cocktail.name}'s Reviews </h3>
                                            {reviews.map((review) => (
                                                <Row key={review._id} className='p-3 m-3'>
                                                    <Col md={2}>
                                                        <h5>{review.user_name}:</h5>
                                                    </Col>
                                                    <Col md={4}>
                                                        <ListGroup variant="flush">
                                                            <ListGroupItem><Rating value={review.rating} /></ListGroupItem>
                                                            <ListGroupItem>{review.comment}</ListGroupItem>
                                                        </ListGroup>
                                                    </Col>
                                                    <hr />
                                                </Row>
                                            ))}
                                        </>
                                    )}
                        </>
                    )}
        </>
    )
}

export default SingleCocktailScreen
