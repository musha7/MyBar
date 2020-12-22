import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Ingredient from '../components/Ingredient'
import { getIngredientsList } from '../actions/ingredientAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const IngredientsScreen = () => {
    const dispatch = useDispatch()

    const ingredientList = useSelector(state => state.ingredientList);
    const { loading, error, ingredients } = ingredientList;

    useEffect(() => {
        dispatch(getIngredientsList())
    }, [dispatch])

    const alcoholIngredients = ingredients.filter(ing => ing.category === 'alcohol');
    const notAlcoholIngredients = ingredients.filter(ing => ing.category !== 'alcohol');

    return (
        <>
            {loading && <Loader />}
            {error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <h1 className='text-center'>Ingredients</h1>
                    <h3> Alcohol Ingredients</h3>
                    <Row>
                        {alcoholIngredients.map((ingredient, index) => (
                            <Col key={index} sm={12} md={6} lg={4} xl={3} >
                                <Ingredient ingredient={ingredient} />
                            </Col>
                        ))}
                    </Row>
                    <h3> Not Alcohol Ingredients</h3>
                    <Row>
                        {notAlcoholIngredients.map((ingredient, index) => (
                            <Col key={index} sm={12} md={6} lg={4} xl={3} >
                                <Ingredient ingredient={ingredient} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

        </>
    )
}

export default IngredientsScreen
