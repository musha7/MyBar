import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addIngredient } from '../actions/ingredientAction'
import { Link } from 'react-router-dom';


const AddIngredientScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [addMessage, setAddMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const ingredientAddToApp = useSelector(state => state.ingredientAddToApp);
    const { loading, error, success, message } = ingredientAddToApp;

    const dispatch = useDispatch()
    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
        if (success) {
            setAddMessage(message)
            setName('')
            setImage('')
            setCategory('')
            dispatch({ type: 'INGREDIENT_ADD_TO_APP_RESET' })
        }
    }, [dispatch, success, history, userInfo, message])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e.target.children[2]);
        const imgExts = /jpg|jpeg|png|gif/
        const currExtension = image.split(/[#?]/)[0].split('.').pop().trim()
        if (imgExts.test(currExtension)) {
            const formatedName = name.split(' ').reduce((acc, curr) => acc + curr[0].toUpperCase() + curr.slice(1).toLowerCase() + ' ', '').slice(0, -1)
            dispatch(addIngredient(formatedName, image, category))
            setCategory('')
        }
        else {
            setAddMessage('Please enter a url with a jpg|jpeg|png|gif extension')
        }

    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/ingredients'>Return To Ingredients</Link>
            <h1 className='text-center p-3'>Add a new Ingredient to our bar</h1>
            <FormContainer>
                {loading && <Loader />}
                {error && (<Message variant='danger'>{error}</Message>)}
                {addMessage && (<Message variant='light'>{addMessage}</Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Ingredient Name</Form.Label>
                        <Form.Control type="text" placeholder="Ingredient Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group controlId="image">
                <Form.Label>Ingredient Image</Form.Label>
                    <Form.File label="Ingredient Image" custom onChange={uploadFileHandler}/>
                </Form.Group> */}
                    <Form.Group controlId="image">
                        <Form.Label>Ingredient image url</Form.Label>
                        <Form.Control type="text" placeholder="Image url" value={image} onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label >Ingredient Category</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Alcoholic Ingredient"
                            onChange={(e) => setCategory('alcohol')}
                            name='category'
                            id='categoryAlcoholic'
                            checked={category && category === 'alcohol'}
                        />
                        <Form.Check
                            type="radio"
                            label="Not Alcoholic Ingredient"
                            onChange={(e) => setCategory('no alcohol')}
                            name='category'
                            id='categoryNotAlcoholic'
                            checked={category && category === 'no alcohol'}
                        />

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Ingredient
                </Button>
                </Form>
            </FormContainer >


        </>
    )
}

export default AddIngredientScreen