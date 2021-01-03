import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { getUserProfile, removeIngredientFromUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyIngredientsScreen = ({ history }) => {
    const [changeMessage, setChangeMessage] = useState('')

    const userGetProfile = useSelector(state => state.userGetProfile);
    const { loading: profileLoading, error: profileErorr, userInfo } = userGetProfile;

    const userIngredientChange = useSelector(state => state.userIngredientChange);
    const { error: ChangeInBarError, message: ChangeInBarMessage } = userIngredientChange;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile())
        // if (userInfo.ingredients.length === 0) {
        //     setChangeMessage('You Do Not Have Ingredients Right Now')
        // }
        if (ChangeInBarMessage) {
            setChangeMessage(ChangeInBarMessage)
        }
        else {
            if (ChangeInBarError) {
                setChangeMessage(ChangeInBarError)
            }
        }
    }, [dispatch, ChangeInBarMessage, ChangeInBarError])

    const deleteHandle = (e, ingredient) => {
        if (userInfo) {
            dispatch(removeIngredientFromUser(ingredient.ingredient))
        } else {
            history.push('/login')
        }
    }
    return (
        <>
            {changeMessage && (<Message variant='danger'>{changeMessage}</Message>)}
            {profileLoading ? <Loader /> : (
                <>
                    {profileErorr ? (<Message variant='danger'>{profileErorr}</Message>) : (
                        <>
                            <h1 className='text-center'>{`${userInfo.name}`}'s Ingredients</h1>
                            <ListGroup variant='flush'>
                                {userInfo.ingredients.map((ingredient) => (
                                    <ListGroupItem key={ingredient._id}>
                                        <Row>
                                            <Col md={3} >
                                                <Image src={`${ingredient.image}`} alt={ingredient.name} fluid roundedCircle />
                                            </Col>
                                            <Col md={3} className='m-3 p-3'><h2><strong>{ingredient.name}</strong></h2></Col>
                                            <Col md={3}>
                                                <Button className='m-3 p-3' size='sm' variant='danger' onClick={(e) => { deleteHandle(e, ingredient) }}>Delete From My Bar</Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </>
                    )
                    }</>
            )
            }
        </>
    )
}

export default MyIngredientsScreen
