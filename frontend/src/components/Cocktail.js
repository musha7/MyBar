import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


const Cocktail = ({ cocktail }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link>
                <Card.Img variant='top' src={cocktail.image} />
            </Link>
            <Card.Body>
                <Card.Title className='text-center'>{cocktail.name}</Card.Title>
                <Card.Text>
                    {cocktail.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
                {cocktail.steps.map((s, index) => (
                    <ListGroupItem>{`${index + 1}. ${s}`}</ListGroupItem>
                ))}
                <ListGroupItem>
                    <Rating value={cocktail.rating} text={`${cocktail.numReviews} reviews`} /></ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default Cocktail
