import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Ingredient = ({ ingredient }) => {
    return (
        <Card className='my-3 p-3 ingredient'>
            <Link>
                <Card.Img variant='top' src={ingredient.image} alt={ingredient.name} />
            </Link>
            <Card.Body>
                <Card.Title className='text-center'>{ingredient.name}</Card.Title>
                <Card.Text>
                    {ingredient.description}
                </Card.Text>
                <Card.Body>
                </Card.Body>
                <Button size='sm' variant='secondary'>Add To My Bar</Button>
                <Button size='sm' variant='danger'>Delete From My Bar</Button>
            </Card.Body>
        </Card>
    )
}

export default Ingredient
