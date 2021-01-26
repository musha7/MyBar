import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addIngredient, getIngredientsList, getCocktailIngredientsList } from '../actions/ingredientAction'
import { Link } from 'react-router-dom';


const AddIngredientScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [addSubCategory, setAddSubCategory] = useState(false)
    const [addMessage, setAddMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const ingredientAddToApp = useSelector(state => state.ingredientAddToApp);
    const { loading, error, success, message } = ingredientAddToApp;

    const cocktailIngredientList = useSelector(state => state.cocktailIngredientList);
    const { error: cocktailIngredientError, cocktailIngredients } = cocktailIngredientList;

    const dispatch = useDispatch()
    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
        if (cocktailIngredients.length === 0) {
            dispatch(getCocktailIngredientsList())
        }
        if (success) {
            setAddMessage(message)
            setName('')
            setImage('')
            setCategory('')
            setSubCategory('')
            setAddSubCategory(false)
            dispatch({ type: 'INGREDIENT_ADD_TO_APP_RESET' })
            dispatch(getIngredientsList())
            dispatch(getCocktailIngredientsList())
        }
        if (category === 'alcohol') {
            setAddSubCategory(true)
        }
        else {
            setAddSubCategory(false)
        }

    }, [dispatch, success, history, userInfo, message, category, subCategory, cocktailIngredients.length])

    const submitHandler = (e) => {
        e.preventDefault()
        const imgExts = /jpg|jpeg|png|gif/
        const currExtension = image.split(/[#?]/)[0].split('.').pop().trim()  // gets the extension
        if (imgExts.test(currExtension)) {
            const formatedName = name.split(' ').reduce((acc, curr) => acc + curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase() + ' ', '').slice(0, -1)
            if (category === 'alcohol' && subCategory === '') {
                setAddMessage('Please select a sub category')
            }
            else {
                const alcoholic = category === 'alcohol' ? true : false
                dispatch(addIngredient(formatedName, image, alcoholic, subCategory))
                setCategory('')
                setAddMessage('')
            }
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
                {addMessage && (<Message variant={addMessage.split(' ')[0] === 'Please' ? 'danger' : 'light'}>{addMessage}</Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Ingredient Name</Form.Label>
                        <Form.Control type="text" placeholder="Ingredient Name" required
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group controlId="image">
                <Form.Label>Ingredient Image</Form.Label>
                    <Form.File label="Ingredient Image" custom onChange={uploadFileHandler}/>
                </Form.Group> */}
                    <Form.Group controlId="image">
                        <Form.Label>Ingredient image url</Form.Label>
                        <Form.Control type="text" placeholder="Image url" required
                            value={image} onChange={(e) => setImage(e.target.value)} />
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
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Not Alcoholic Ingredient"
                            onChange={(e) => setCategory('no alcohol')}
                            name='category'
                            id='categoryNotAlcoholic'
                            checked={category && category === 'no alcohol'}
                            required
                        />

                    </Form.Group>
                    {cocktailIngredientError ? <Message variant='danger'>{cocktailIngredientError}</Message> : (
                        <Form.Control
                            as="select"
                            className=" mb-3"
                            id="subCategorySelect"
                            disabled={!addSubCategory}
                            custom
                            onChange={(e) => setSubCategory(e.target.value)}
                        >
                            <option value="0">Choose Sub Category</option>
                            {cocktailIngredients.map(CI => (
                                <option key={CI._id} value={CI.name}>{CI.name}</option>
                            ))}
                            <option value="Other">Other</option>
                        </Form.Control>
                    )}

                    <Button variant="primary" type="submit" className="mt-3">
                        Add Ingredient
                </Button>
                </Form>
            </FormContainer >


        </>
    )
}

export default AddIngredientScreen
