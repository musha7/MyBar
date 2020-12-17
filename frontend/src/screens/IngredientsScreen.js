import React from 'react'
import { Row, Col } from 'react-bootstrap';
import ingredients from '../ingredients'
import Ingredient from '../components/Ingredient'


const IngredientsScreen = () => {
    return (
        <Row>
            {ingredients.map((ingredient, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Ingredient ingredient={ingredient} />
                </Col>
            ))}
        </Row>
    )
}

export default IngredientsScreen
