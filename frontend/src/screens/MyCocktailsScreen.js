import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getUserCocktails, getUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const MyCocktailsScreen = () => {

    const userGetCocktails = useSelector(state => state.userGetCocktails);
    const { loading, error, cocktails } = userGetCocktails;

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { loading: profileLoading, error: profileErorr, userInfo } = userGetProfile;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getUserCocktails())
    }, [dispatch])

    return (
        <>
            {profileLoading ? <Loader /> : (
                loading ? <Loader /> :
                    error ? (
                        <>
                            <Message variant='danger'>{error}</Message>
                            <Link className='btn btn-light my-3' to='/ingredients'>Add some new ingredients to your bar</Link>
                        </>) : (
                            profileErorr ? (<Message variant='danger'>{profileErorr}</Message>) : (
                                <>
                                    <h1 className='text-center'>{`${userInfo.name}`}'s Cocktails</h1>
                                    <ListGroup variant='flush'>
                                        {cocktails.map((c) => (
                                            <ListGroupItem key={c._id}>
                                                <Row>
                                                    <Col md={3} >
                                                        <Image src={`${c.image}`} alt={c.name} fluid roundedCircle />
                                                    </Col>
                                                    <Col md={1}><h2><Link to={`/cocktails/${c.cocktail}`}><strong>{c.name}</strong></Link></h2></Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}

                                    </ListGroup>
                                </>
                            ))
            )}
        </>
    )
}

export default MyCocktailsScreen
