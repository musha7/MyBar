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
        dispatch(removeIngredientFromUser(ingredient.ingredient))
    }
    return (
        <>
            {changeMessage && (<Message variant='danger'>{changeMessage}</Message>)}
            {getIngredientsLoading && <Loader />}
            {getIngredientsErorr ? (<Message variant='danger'>{getIngredientsErorr}</Message>) :
                (ingredients &&
                    (
                        ingredients.length === 0 ? (
                            <>
                                <Message variant='danger'>You don't have any ingredient in your bar</Message>
                                <Link className='btn btn-light my-3' onClick={() => { dispatch({ type: 'USER_INGREDIENT_CHANGE_RESET' }) }} to='/ingredients' >Add some new ingredients to your bar</Link>
                            </>
                        ) :
                            <>
                                <h1 className='text-center'>{`${userInfo.name}`}'s Ingredients</h1>
                                <Col md={10} xs={12}>
                                    <ListGroup variant='flush'>
                                        {ingredients.map((ingredient) => (
                                            <ListGroupItem key={ingredient._id}>
                                                <Row >
                                                    <Col xs={4}>
                                                        <Image src={`${ingredient.image}`} alt={ingredient.name} fluid />
                                                    </Col>
                                                    <Col xs={3} style={{ 'font-size': '1.5em', 'font-weight': 'bold' }} className='text-center' ><strong>{ingredient.name}</strong></Col>
                                                    <Col xs={4}>
                                                        <Button variant='danger' onClick={(e) => { deleteHandle(e, ingredient) }}>Delete From My Bar</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </>
                    )
                )

            }
        </>
    )
}

export default MyIngredientsScreen
