import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const dispatch = useDispatch()
    useEffect(() => {
        console.log(userInfo);
        if (userInfo) {
            history.push('/')
        }
    }, [dispatch, userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            {loading && <Loader />}
            {error && (<Message variant='danger'>{error}</Message>)}
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign In
                </Button>
                </Form>
                <Row className='py-3'>
                    <Col>Not <Link to='/register'>Registered</Link> Yet? </Col>
                </Row>
            </FormContainer >
        </>
    )
}

export default LoginScreen
