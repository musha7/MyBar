import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addReview } from '../actions/reviewActions'
import { Button, Col, Form, Row } from 'react-bootstrap'

const CocktailReview = ({ cocktail }) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [addRevMessage, setAddRevMessage] = useState('')

    const reviewAdd = useSelector(state => state.reviewAdd);
    const { loading, error: reviewAddError, message: reviewAddMessage, success: reviewAddSuccess } = reviewAdd;

    const userLogin = useSelector(state => state.userLogin);
    const { loading: userInfoLoading, error: userInfoError, userInfo } = userLogin;

    useEffect(() => {
        if (reviewAddSuccess) {
            setAddRevMessage(reviewAddMessage)
        }
        else {
            setAddRevMessage('')
        }
    }, [reviewAddSuccess, reviewAddMessage])

    const submitHandler = (e) => {
        e.preventDefault()
        if (rating === 0) {
            setAddRevMessage('Please, Choose a rating')
        }
        else {
            if (!comment) {
                setAddRevMessage('Please, Write a review')
            } else {
                dispatch(addReview(cocktail._id, { rating, comment, name: userInfo.name }))
                setRating(0)
                setComment('')
            }
        }
    }

    return (
        <Row className='p-3 m-3'>
            <Col md={6}>
                <h3>Rate  cocktail </h3>
                {loading && <Loader />}
                {userInfoLoading ? <Loader /> :
                    userInfoError ? <Message variant='danger'>{userInfoError}</Message> : (
                        <Form onSubmit={submitHandler}>
                            {reviewAddError && <Message variant='danger'>{reviewAddError}</Message>}
                            {addRevMessage && <Message variant='light'>{addRevMessage}</Message>}
                            <Form.Group controlId='rating'>
                                <Form.Label > Rating </Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="1 - Was not tasty"
                                    onChange={(e) => setRating(1)}
                                    name='rating'
                                    value={1}
                                    checked={rating && rating === 1}
                                />
                                <Form.Check
                                    type="radio"
                                    label="2 - It was ok"
                                    onChange={(e) => setRating(2)}
                                    name='rating'
                                    value={2}
                                    checked={rating && rating === 2}
                                />
                                <Form.Check
                                    type="radio"
                                    label="3 - Pretty good"
                                    onChange={(e) => setRating(3)}
                                    name='rating'
                                    value={3}
                                    checked={rating && rating === 3}
                                />
                                <Form.Check
                                    type="radio"
                                    label="4 - Very good"
                                    onChange={(e) => setRating(4)}
                                    name='rating'
                                    value={4}
                                    checked={rating && rating === 4}
                                />
                                <Form.Check
                                    type="radio"
                                    label="5 - One of the best! I need one more"
                                    onChange={(e) => setRating(5)}
                                    name='rating'
                                    value={5}
                                    checked={rating && rating === 5}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Write A Review</Form.Label>
                                <Form.Control type="text" rows={3} placeholder="Write A Review" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add Review
                            </Button>
                        </Form>
                    )
                }

            </Col>
        </Row>

    )
}

export default CocktailReview
