import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import Loader from '../components/Loader';


const RegisterScreen = ({ history }) => {
    const [name, setName] = useState('')
    //const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, success } = userRegister;

    const dispatch = useDispatch()
    useEffect(() => {
        if (success) {
            history.push('/')
        }
    }, [dispatch, success, history])

    const submitHandler = (e) => {
        //setPasswordMessage(false)
        e.preventDefault()
        console.log(name, category);
        //dispatch(register(email, name, password))
    }
    return (
        <FormContainer>
            {loading && <Loader />}
            {error && (<Message variant='danger'>{error}</Message>)}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Ingredient Name</Form.Label>
                    <Form.Control type="text" placeholder="Ingredient Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.File label="Ingredient Image" />
                </Form.Group>

                <Form.Group >
                    <Form.Label >Ingredient Category</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Alcoholic Ingredient"
                        onChange={(e) => setCategory('alcohol')}
                        name='category'
                    />
                    <Form.Check
                        type="radio"
                        label="Not Alcoholic Ingredient"
                        onChange={(e) => setCategory('no alcohol')}
                        name='category'
                    />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Ingredient
                </Button>
            </Form>
        </FormContainer >
    )
}

export default RegisterScreen
