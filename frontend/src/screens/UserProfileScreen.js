import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Row, Col, Form, Button, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
// import UpdateReview from '../components/UpdateReview';

const UserProfileScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { loading, error, userInfo } = userGetProfile;
    const reviews = userInfo.reviews

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: updateLoading, error: updateError, success } = userUpdateProfile;

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
    }, [dispatch, success, history, userInfo])

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
    return (
        <>
            {loading && <Loader />}
            {updateLoading && (<Message variant='danger'>{updateLoading}</Message>)}
            {error && (<Message variant='danger'>{error}</Message>)}
            {updateError && (<Message variant='danger'>{updateError}</Message>)}
            {passwordMessage && <Message variant='danger'>Passwords Do Not Match</Message>}
            {updateMessage && <Message variant='light'>Profile Updated</Message>}
            <h1>{userInfo.name}'s Profile</h1>
            <FormContainer>
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
                            <Row key={review._id} className=' m-3'>
                                <Col md={2}><Image src={review.cocktail_image} alt={review.cocktail_name} fluid roundedCircle /></Col>
                                <Col md={2}>
                                    <Row><Link to={`/cocktails/${review.cocktail}`}><strong>{review.cocktail_name}</strong></Link></Row>
                                    <Row>{moment(review.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD HH:mm:ss')}</Row>
                                </Col>
                                <Col md={4}>
                                    <ListGroup variant="flush">
                                        <ListGroupItem><Rating value={review.rating} /></ListGroupItem>
                                        <ListGroupItem>{review.comment}</ListGroupItem>
                                    </ListGroup>
                                </Col>
                                {/* <Col>
                            <Link className='btn btn-dark my-3' to={`/reviews/${review._id}`}>Update Review</Link>
                        </Col> */}
                            </Row>
                        ))}
                    </>
                ))}
        </>
    )
}

export default UserProfileScreen
