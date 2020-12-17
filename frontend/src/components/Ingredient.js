import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Ingredient = ({ ingredient }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link>
                <Card.Img variant='top' src={ingredient.image} />
            </Link>
            <Card.Body>
                <Card.Title className='text-center'>{ingredient.name}</Card.Title>
                <Card.Text>
                    {ingredient.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Ingredient
