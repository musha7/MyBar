import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader';


const RegisterScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { loading, error, userInfo } = userGetProfile;

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
        <FormContainer>
            {loading && <Loader />}
            {updateLoading && (<Message variant='danger'>{updateLoading}</Message>)}
            {error && (<Message variant='danger'>{error}</Message>)}
            {updateError && (<Message variant='danger'>{updateError}</Message>)}
            {passwordMessage && <Message variant='danger'>Passwords Do Not Match</Message>}
            {updateMessage && <Message variant='light'>Profile Updated</Message>}
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
    )
}

export default RegisterScreen
