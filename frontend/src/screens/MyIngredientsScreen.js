import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserIngredients, removeIngredientFromUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyIngredientsScreen = ({ history }) => {
    const [changeMessage, setChangeMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userIngredientChange = useSelector(state => state.userIngredientChange);
    const { error: ChangeInBarError, message: ChangeInBarMessage } = userIngredientChange;

    const userGetIngredients = useSelector(state => state.userGetIngredients);
    const { loading: getIngredientsLoading, error: getIngredientsErorr, ingredients } = userGetIngredients;

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        dispatch(getUserIngredients())
        if (ChangeInBarMessage) {
            setChangeMessage(ChangeInBarMessage)
        }
        else {
            if (ChangeInBarError) {
                setChangeMessage(ChangeInBarError)
            }
        }
    }, [dispatch, ChangeInBarMessage, ChangeInBarError, userInfo, history])

    const deleteHandle = (e, ingredient) => {
        e.preventDefault()
        if (userInfo) {
            dispatch(removeIngredientFromUser(ingredient.ingredient))
        } else {
            history.push('/login')
        }
    }
    return (
        <>
            {changeMessage && (<Message variant='danger'>{changeMessage}</Message>)}
            {getIngredientsLoading ? <Loader /> : (
                <>
                    {getIngredientsErorr ? (<Message variant='danger'>{getIngredientsErorr}</Message>) : (
                        ingredients.length === 0 ? (
                            <>
                                <Message variant='danger'>You don't have any ingredient in your bar</Message>
                                <Link className='btn btn-light my-3' onClick={() => { dispatch({ type: 'USER_INGREDIENT_CHANGE_RESET' }) }} to='/ingredients' >Add some new ingredients to your bar</Link>
                            </>
                        ) :
                            <>
                                <h1 className='text-center'>{`${userInfo.name}`}'s Ingredients</h1>
                                <ListGroup variant='flush'>
                                    {ingredients.map((ingredient) => (
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
