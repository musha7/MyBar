import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Ingredient = ({ ingredient }) => {
    return (
        <Card className='my-3 p-3 ingredient'>
            <Link>
                <Card.Img variant='top' src={ingredient.image} alt={ingredient.name} />
            </Link>
            <Card.Body>
                <Card.Title className='text-center'>{ingredient.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Ingredient
