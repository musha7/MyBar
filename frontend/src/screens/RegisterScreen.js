import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const submitHandler = () => { }
    return (
        <FormContainer>
            <Form >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Name" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password </Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitHandler}>
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
