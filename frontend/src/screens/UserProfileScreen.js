import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Row, Col, Form, Button, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import { updateReview } from '../actions/reviewActions'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const UserProfileScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)

    const [reviewToUpdate, setReviewToUpdate] = useState(0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [updateRevMessage, setUpdateRevMessage] = useState('')

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { loading, error, userInfo } = userGetProfile;
    const reviews = userInfo.reviews

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: updateLoading, error: updateError, success } = userUpdateProfile

    const reviewUpdate = useSelector(state => state.reviewUpdate);
    const { error: reviewUpdateError, success: reviewUpdateSuccess } = reviewUpdate

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUserProfile())
        }
        else {
            setUpdateMessage(false)
            if (success) {
                setUpdateMessage(true)
            }
            else {
                setEmail(userInfo.email)
                setName(userInfo.name)
            }
        }
        if (reviewUpdateSuccess) {
            setUpdateRevMessage('Review Updated')
            dispatch({ type: 'REVIEW_UPDATE_RESET' })
            dispatch(getUserProfile())
        }
    }, [dispatch, success, history, userInfo, reviewUpdateSuccess])

    const submitHandler = (e) => {
        setUpdateMessage(false)
        setPasswordMessage(false)
        e.preventDefault()
        if (password === confirmedPassword) {
            dispatch(updateUserProfile(email, name, password))
            dispatch(getUserProfile())
        } else {
            setPasswordMessage(true)
        }
    }

    const submitReviewHandler = (e, reviewId) => {
        e.preventDefault()
        setUpdateRevMessage('')
        if (rating === 0) {
            setUpdateRevMessage('Please, Choose a rating')
        }
        else {
            if (!comment) {
                setUpdateRevMessage('Please, Write a review')
            } else {
                dispatch(updateReview(reviewId, rating, comment))
                setRating(0)
                setComment('')
                setReviewToUpdate(0)
            }
        }
    }

    return (
        <>
            {loading && <Loader />}
            {updateLoading && (<Message variant='danger'>{updateLoading}</Message>)}
            {error && (<Message variant='danger'>{error}</Message>)}
            {updateError && (<Message variant='danger'>{updateError}</Message>)}
            {passwordMessage && <Message variant='danger'>Passwords Do Not Match</Message>}
            {updateMessage && <Message variant='light'>Profile Updated</Message>}
            <h1 className='text-center'>{userInfo.name}'s Profile</h1>
            <FormContainer smd={12} sxs={7}>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="confirmedPassword">
                        <Form.Label>Confirm password </Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update profile
                </Button>
                </Form>
            </FormContainer >

            {!reviews ? <Loader /> : (
                reviews.length === 0 ? '' : (
                    <>
                        <hr className='m-3 p-3' />
                        <h3 className='m-3 p-3'> {userInfo.name.split(' ')[0]}'s Reviews</h3>
                        {reviews.map((review) => (
                            <>
                                <Row key={review._id} className='m-3'>
                                    <Col md={2} xs={4}><Image src={review.cocktail_image} alt={review.cocktail_name} fluid roundedCircle /></Col>
                                    <Col md={2} xs={4}>
                                        <Row><Link to={`/cocktails/${review.cocktail}`}><strong>{review.cocktail_name}</strong></Link></Row>
                                        <Row>{moment(review.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD HH:mm:ss')}</Row>
                                    </Col>
                                    <Col md={3} xs={5}>
                                        <ListGroup variant="flush">
                                            <ListGroupItem><Rating value={review.rating} /></ListGroupItem>
                                            <ListGroupItem>{review.comment}</ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                    <Col className='mt-3'>
                                        <Button onClick={() => { setUpdateRevMessage(''); setReviewToUpdate(review._id) }}>Change Review</Button>
                                    </Col>
                                    {reviewToUpdate === review._id && (
                                        <Form onSubmit={(e) => submitReviewHandler(e, review._id)}>
                                            {reviewUpdateError && <Message variant='danger'>{reviewUpdateError}</Message>}
                                            {updateRevMessage && <Message variant='light'>{updateRevMessage}</Message>}
                                            <Form.Group controlId='rating'>
                                                <Form.Label > <strong>Rating</strong> </Form.Label>
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
                                                <Form.Label><strong>Write A Review</strong></Form.Label>
                                                <Form.Control type="text" rows={3} placeholder="Write A Review" value={comment} onChange={(e) => setComment(e.target.value)} />
                                            </Form.Group>
                                            <Button variant="info" type="submit">
                                                Update Review
                                    </Button>
                                        </Form>
                                    )}

                                </Row>
                                <hr className='m-3' />
                            </>
                        ))}
                    </>
                ))}
        </>
    )
}

export default UserProfileScreen
