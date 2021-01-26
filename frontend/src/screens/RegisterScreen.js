import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import { register } from '../actions/userActions'
import Loader from '../components/Loader';


const RegisterScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState(false)

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, success } = userRegister;

    const dispatch = useDispatch()
    useEffect(() => {
        if (success) {
            history.push('/')
        }
    }, [dispatch, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password === confirmedPassword) {
            dispatch(register(email, name, password))
        } else {
            setPasswordMessage(true)
        }
    }
    return (
        <FormContainer>
            {passwordMessage && <Message variant='danger'>Passwords Do Not Match</Message>}
            {loading && <Loader />}
            {error && (<Message variant='danger'>{error}</Message>)}
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
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>Already Registered? <Link to='/login'>Login Now</Link></Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
