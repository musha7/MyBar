import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import Ingredient from '../components/Ingredient'
import { getIngredientsList } from '../actions/ingredientAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const IngredientsScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const ingredientList = useSelector(state => state.ingredientList);
    const { loading, error, ingredients } = ingredientList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getIngredientsList())
        setMessage('')
    }, [dispatch])

    const alcoholIngredients = ingredients.filter(ing => ing.category === 'alcohol');
    const notAlcoholIngredients = ingredients.filter(ing => ing.category !== 'alcohol');
    const addHandle = (e, ingredient) => {
        if (userInfo) {
            if (!userInfo.ingredients.includes(ingredient)) {
                userInfo.ingredients.push(ingredient)
                setMessage(`${ingredient.name} was added to your bar`)
            }
            else {
                setMessage(`${ingredient.name} is already in your bar`)
            }
        } else {
            history.push('/login')
        }
    }

    const deleteHandle = () => {

    }

    const showIngredients = (ings) => {
        return (
            <>
                {message && (<Message variant='danger'>{message}</Message>)}
                <Row>
                    {ings.map((ingredient, index) => (
                        <Col key={index} sm={12} md={6} lg={4} xl={3} >
                            <Card className='my-3 p-3 ingredient'>
                                <Card.Img variant='top' src={ingredient.image} alt={ingredient.name} />
                                <Card.Body>
                                    <Card.Title className='text-center'>{ingredient.name}</Card.Title>
                                </Card.Body>
                                <Button size='sm' variant='secondary' onClick={(e) => { addHandle(e, ingredient) }}>Add To My Bar</Button>
                                <Button size='sm' variant='danger' onClick={deleteHandle}>Delete From My Bar</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    return (
        <>
            {loading && <Loader />}
            {error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <h1 className='text-center'>Ingredients</h1>
                    <h3> Alcohol Ingredients</h3>
                    {showIngredients(alcoholIngredients)}
                    <h3> Not Alcohol Ingredients</h3>
                    {showIngredients(notAlcoholIngredients)}
                </>
            )}

        </>
    )
}

export default IngredientsScreen
