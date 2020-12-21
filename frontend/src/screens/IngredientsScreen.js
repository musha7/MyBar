import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Ingredient from '../components/Ingredient'

const IngredientsScreen = () => {
    const [ingredients, setIngredient] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/ingredients`)

            setIngredient(data.ingredients)
        }

        fetchProduct()
    }, [])

    return (
        <>
            <h1 className='text-center'>Ingredients</h1>
            <Row sm={1} md={1} lg={1} xl={1} xs={1}>
                {ingredients.map((ingredient, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3} >
                        <Ingredient ingredient={ingredient} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default IngredientsScreen
