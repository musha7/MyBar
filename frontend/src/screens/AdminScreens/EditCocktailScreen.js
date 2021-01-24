import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getIngredientsList, getCocktailIngredientsList } from '../../actions/ingredientAction'
import { updateCocktail, getCocktailById } from '../../actions/cocktailActions'
import { Link } from 'react-router-dom';


const EditCocktailScreen = ({ match, history }) => {
    const [firstLoad, setFirstLoad] = useState(0)
    const [secondLoad, setSecondLoad] = useState(0)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [currIngredient, setCurrIngredient] = useState('')
    const [steps, setSteps] = useState([])
    const [numOfSteps, setNumOfSteps] = useState(1)
    const [updateMessage, setUpdateMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cocktailById = useSelector(state => state.cocktailById);
    const { loading: cocktailByIdLoading, error: cocktailByIdError, cocktail } = cocktailById;

    const ingredientList = useSelector(state => state.ingredientList);
    const { loading: ingredientsLoading, error: ingredientsError, ingredients: listOfIngredients } = ingredientList;

    const cocktailIngredientList = useSelector(state => state.cocktailIngredientList);
    const { loading: cocktailIngredientLoading, error: cocktailIngredientError, cocktailIngredients } = cocktailIngredientList;

    const notAlcoholIngredients = listOfIngredients.filter(ing => !ing.alcoholic);

    const cocktailUpdate = useSelector(state => state.cocktailUpdate);
    const { loading: cocktailUpdateLoading, error: cocktailUpdateError, success: cocktailUpdateSuccess } = cocktailUpdate;

    const dispatch = useDispatch()

    useEffect(() => {
        if (secondLoad === 1) {
            console.log('in here');
            //setSecondLoad(2)
            setName(cocktail.name)
            setImage(cocktail.image)
            setSteps(cocktail.steps)
            setNumOfSteps(cocktail.steps.length)
            setIngredients(cocktail.ingredients.map(ingredint => ingredint.name))
        }
        if (!userInfo) {
            history.push('/')
        }
        if (firstLoad === 0) {
            dispatch(getCocktailById(match.params.id))
            dispatch(getIngredientsList())
            dispatch(getCocktailIngredientsList())
            setSecondLoad(1)
            setFirstLoad(1)
        }
        if (cocktailUpdateSuccess) {
            setUpdateMessage(`${cocktail.name} Updated Successfully`)
            dispatch({ type: 'COCKTAIL_UPDATE_COMPLETED' })
            dispatch(getCocktailById(match.params.id))
        }

    }, [dispatch, userInfo, history, match, secondLoad, cocktail, firstLoad, cocktailUpdateSuccess])

    const addIngredient = () => {
        const ings = [...ingredients]
        ings.push(currIngredient)
        setIngredients(ings)
        setCurrIngredient('')
    }
    const removeIngredient = (name) => {
        const ings = [...ingredients]
        const indexToRemove = ings.findIndex(ing => ing === name)
        ings.splice(indexToRemove, 1)
        setIngredients(ings)
    }

    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/')
    //     }
    //     console.log(match.params.id);
    //     if (cocktail.ingredients.length === 0) {
    //         console.log('cocktail:', cocktail);
    //         dispatch(getCocktailById(match.params.id))
    //     }
    //     // else {
    //     //     setName(cocktail.name)
    //     //     setImage(cocktail.image)
    //     //     setSteps(cocktail.steps)
    //     //     setIngredients(cocktail.ingredients)
    //     // }
    //     // if (listOfIngredients.length === 0) {
    //     //     dispatch(getIngredientsList())
    //     // }
    //     // if (cocktailIngredients.length === 0) {
    //     //     dispatch(getCocktailIngredientsList())
    //     // }


    //     // if (success) {
    //     //     setUpdateMessage(payload.message)
    //     //     setCreatedCocktailName(payload.name)
    //     //     setCreatedCocktailId(payload.id)
    //     //     setName('')
    //     //     setImage('')
    //     //     setSteps([])
    //     //     setNumOfSteps(1)
    //     //     setIngredients([])
    //     //     setCurrIngredient('')
    //     //     dispatch({ type: 'COCKTAIL_ADD_TO_APP_RESET' })
    //     //     dispatch(getCocktailsList())
    //     // }
    // }, [dispatch, history, match, userInfo, cocktail])
    // //, numOfSteps, ingredients, listOfIngredients.length, cocktailIngredients.length])

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
        setUpdateMessage('')

        const imgExts = /jpg|jpeg|png|gif/
        const currExtension = image.split(/[#?]/)[0].split('.').pop().trim()  // gets the extension
        if (imgExts.test(currExtension)) {
            const formatedName = name.split(' ').reduce((acc, curr) => acc + curr[0].toUpperCase() + curr.slice(1).toLowerCase() + ' ', '').slice(0, -1)
            dispatch(updateCocktail(cocktail._id, formatedName, image, ingredients, steps))
        }
        else {
            setUpdateMessage('Please enter a url with a jpg|jpeg|png|gif extension')
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <Link className='btn btn-dark my-3' to='/admin/cocktailsList'>Return To Cocktail List</Link>

                </Col>
                <Col className='offset-5'>
                    {cocktail &&
                        <Link className='btn btn-dark my-3' to={`/cocktails/${cocktail._id}`}>Go to {cocktail.name}</Link>
                    }
                </Col>
            </Row>

            {cocktailByIdError ? (<Message variant='danger'>{cocktailByIdLoading}</Message>) :
                cocktailByIdLoading ? <Loader /> : (<h1 className='text-center p-3'>Update {cocktail.name}</h1>)}

            <FormContainer smd={9} sxs={15}>
                {(cocktailUpdateLoading) && <Loader />}
                {cocktailUpdateError && (<Message variant='danger'>{cocktailUpdateError}</Message>)}
                {updateMessage && (<Message variant='light'>{updateMessage}</Message>)}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label><strong>Cocktail Name</strong></Form.Label>
                        <Form.Control type="text" placeholder="Cocktail Name" required
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label><strong>Cocktail image url</strong></Form.Label>
                        <Form.Control type="text" placeholder="Image url" required
                            value={image} onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    {(ingredientsLoading || cocktailIngredientLoading) ? <Loader /> :
                        ingredientsError ? <Message variant="danger">{ingredientsError}</Message> :
                            cocktailIngredientError ? <Message variant="danger">{cocktailIngredientError}</Message> : (
                                <>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="alcoholIngredient">
                                                <Form.Label><strong>Alcoholic Ingredients</strong></Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    custom
                                                    onChange={(e) => setCurrIngredient(e.target.value)}
                                                >
                                                    <option value="">Choose Ingredient</option>
                                                    {cocktailIngredients.map(ing => {
                                                        if (ing.name !== 'Liqueur') {
                                                            return <option key={ing._id} value={ing.name}>{ing.name}</option>
                                                        }
                                                        else {
                                                            return ing.ingredients.map(liqueur => (
                                                                <option key={liqueur._id} value={liqueur.name}>{liqueur.name}</option>
                                                            ))
                                                        }

                                                    })}

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-3">
                                            <Button className="mt-3" variant="info" type="button" onClick={() => addIngredient()}>
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                    </Form.Row>

                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="alcoholIngredient">
                                                <Form.Label><strong>Not Alcoholic Ingredients</strong></Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    custom
                                                    onChange={(e) => setCurrIngredient(e.target.value)}
                                                >
                                                    <option value="">Choose Ingredient</option>
                                                    {notAlcoholIngredients.map(ing => (
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
                                    {ingredients.length !== 0 && <strong> Added Ingredients </strong>}
                                    {ingredients.map((ing, index) => (
                                        <Form.Row key={index} >
                                            <Col >
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
                    <Form.Row >
                        <FormLabel className='ml-1'>Don't have an ingredient?
                            <Link to='/addIngredient'> add here!</Link>
                        </FormLabel>
                    </Form.Row>

                    <Form.Label><strong>Steps for making the Cocktail</strong></Form.Label>
                    {[...Array(numOfSteps)].map((x, i) => (
                        <Form.Row key={i}>
                            <Col xs={1}>{i + 1}.</Col>
                            <Col >
                                <Form.Group controlId="steps">
                                    <Form.Control type="text" value={steps[i]} placeholder="Cocktail Steps" required
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
                        Update Cocktail
                </Button>
                </Form>
            </FormContainer >


        </>
    )
}

export default EditCocktailScreen
