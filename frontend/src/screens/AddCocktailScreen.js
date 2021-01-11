import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getIngredientsList } from '../actions/ingredientAction'
import { getCocktailsList, addCocktail } from '../actions/cocktailActions'
import { Link } from 'react-router-dom';


const AddCocktailScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [currIngredient, setCurrIngredient] = useState('')
    const [steps, setSteps] = useState([])
    const [numOfSteps, setNumOfSteps] = useState(1)
    const [addMessage, setAddMessage] = useState('')
    const [createdCocktailName, setCreatedCocktailName] = useState('')
    const [createdCocktailId, setCreatedCocktailId] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const ingredientList = useSelector(state => state.ingredientList);
    const { loading: ingredientsLoading, error: ingredientsError, ingredients: listOfIngredients } = ingredientList;

    const cocktailAddToApp = useSelector(state => state.cocktailAddToApp);
    const { loading, error, success, payload } = cocktailAddToApp;

    const dispatch = useDispatch()

    const addIngredient = () => {
        const ings = [...ingredients]
        ings.push(currIngredient)
        setIngredients(ings)
        setCurrIngredient('')
    }
    const removeIngredient = (name) => {
        const ings = [...ingredients]
        const indexToRemove = ings.findIndex(ing => ing === name)
        console.log('indexToRemove:', indexToRemove);
        ings.splice(indexToRemove, 1)
        setIngredients(ings)
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
        if (listOfIngredients.length === 0) {
            dispatch(getIngredientsList())
        }

        if (success) {
            setAddMessage(payload.message)
            setCreatedCocktailName(payload.name)
            setCreatedCocktailId(payload.id)
            setName('')
            setImage('')
            setSteps([])
            setNumOfSteps(1)
            setIngredients([])
            setCurrIngredient('')
            dispatch({ type: 'COCKTAIL_ADD_TO_APP_RESET' })
            dispatch(getCocktailsList())
        }

    }, [dispatch, history, userInfo, numOfSteps, ingredients, listOfIngredients.length, success, payload])

    const handleInputStep = (e, i) => {
        const s = [...steps]
        if (s.length < i) {
            s.push({})
        }
        s[i] = e.target.value
        setSteps(s)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setAddMessage('')
        setCreatedCocktailName('')
        setCreatedCocktailName('')
        const imgExts = /jpg|jpeg|png|gif/
        const currExtension = image.split(/[#?]/)[0].split('.').pop().trim()  // gets the extension
        if (imgExts.test(currExtension)) {
            const formatedName = name.split(' ').reduce((acc, curr) => acc + curr[0].toUpperCase() + curr.slice(1).toLowerCase() + ' ', '').slice(0, -1)
            dispatch(addCocktail(formatedName, image, ingredients, steps))
        }
        else {
            setAddMessage('Please enter a url with a jpg|jpeg|png|gif extension')
        }
    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/cocktails'>Return To Cocktails</Link>
            {createdCocktailName &&
                <Message variant='light'>
                    <Link to={`/cocktails/${createdCocktailId}`}>Go to </Link>
                    {createdCocktailName} page and rate it!</Message>
            }
            <h1 className='text-center p-3'>Add a new Cocktail to our bar</h1>
            <FormContainer smd={9} sxs={15}>
                {loading && <Loader />}
                {error && (<Message variant='danger'>{error}</Message>)}
                {addMessage && (<Message variant='light'>{addMessage}</Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Cocktail Name</Form.Label>
                        <Form.Control type="text" placeholder="Cocktail Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group controlId="image">
                <Form.Label>Ingredient Image</Form.Label>
                    <Form.File label="Ingredient Image" custom onChange={uploadFileHandler}/>
                </Form.Group> */}
                    <Form.Group controlId="image">
                        <Form.Label>Cocktail image url</Form.Label>
                        <Form.Control type="text" placeholder="Image url"
                            value={image} onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    {ingredientsLoading ? <Loader /> :
                        ingredientsError ? <Message variant="danger">{ingredientsError}</Message> : (
                            <>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="alcoholIngredient">
                                            <Form.Label>Alcohol Ingredients</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className=" mb-3"
                                                custom
                                                onChange={(e) => setCurrIngredient(e.target.value)}
                                            >
                                                <option value="0">Choose Ingredient</option>
                                                {listOfIngredients.map(ing => (
                                                    <option key={ing._id} value={ing.name}>{ing.name}</option>
                                                ))}

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="mt-3">
                                        <Button className="mt-3" variant="info" type="button" onClick={() => addIngredient()}>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                </Form.Row>
                                {ingredients.map((ing, index) => (
                                    <Form.Row key={index}>
                                        <Col>
                                            {ing}
                                        </Col>
                                        <Col>
                                            <Button variant="danger" type="button" onClick={() => removeIngredient(ing)}>
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>
                                        </Col>
                                    </Form.Row>

                                ))}
                            </>
                        )
                    }

                    <Form.Label>Steps for making the Cocktail</Form.Label>
                    {[...Array(numOfSteps)].map((x, i) => (
                        <Form.Row key={i}>
                            <Col xs={1}>{i + 1}.</Col>
                            <Col >
                                <Form.Group controlId="steps">
                                    <Form.Control type="text" placeholder="Cocktail Steps"
                                        onChange={(e) => handleInputStep(e, i)} />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    ))}
                    <Form.Row >
                        {<Col xs={10}></Col>}
                        <Col xs={1} >
                            <Button variant="info" type="button" onClick={() => setNumOfSteps(numOfSteps + 1)}>
                                <i className="fas fa-plus-circle"></i>
                            </Button>
                        </Col>
                        <Col xs={1}>
                            <Button variant="danger" type="button" onClick={() => setNumOfSteps(numOfSteps - 1)}>
                                <i className="fas fa-minus-circle"></i>
                            </Button>
                        </Col>
                    </Form.Row>

                    <Button variant="primary" type="submit" className="mt-3">
                        Add Cocktail
                </Button>
                </Form>
            </FormContainer >


        </>
    )
}

export default AddCocktailScreen
