import moment from 'moment'
import React from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from './Loader';

const UpdateReview = (reviews = []) => {
    return (
        <>
            {!reviews ? <Loader /> : (
                reviews.map((review) => (
                    <Row key={review._id} className='p-3 m-3'>
                        <Col md={2}>{review.image}</Col>
                        <Col md={2}>
                            {review.cocktail_name}
                            {moment(review.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD HH:mm:ss')}
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroupItem><Rating value={review.rating} /></ListGroupItem>
                                <ListGroupItem>{review.comment}</ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col>
                            <Link className='btn btn-dark my-3' to={`/reviews/${review._id}`}>Update Review</Link>
                        </Col>
                    </Row>
                )))}
        </>
    )
}

export default UpdateReview
