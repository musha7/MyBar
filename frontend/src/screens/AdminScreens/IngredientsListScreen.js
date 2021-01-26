import React, { useEffect } from 'react'
import { Table, Button, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getIngredientsList, deleteIngredient } from '../../actions/ingredientAction'

const IngredientsListScreen = ({ history }) => {

    const ingredientList = useSelector(state => state.ingredientList);
    const { loading: ingredientListLoading, error: ingredientListError, ingredients } = ingredientList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const ingredientDelete = useSelector(state => state.ingredientDelete);
    const { loading: ingredientDeleteLoading, error: ingredientDeleteError, success: ingredientDeleteSuccess } = ingredientDelete;

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (ingredients.length === 0) {
            dispatch(getIngredientsList())
        }
        if (ingredientDeleteSuccess) {
            dispatch({ type: 'INGREDIENT_DELETE_COMPLETED' })
            dispatch(getIngredientsList())
        }

    }, [dispatch, history, userInfo, ingredients.length, ingredientDeleteSuccess])

    const handleDeleteIngredient = (id) => {
        dispatch(deleteIngredient(id))
    }
    const handleEditIngredient = (id) => { }

    return (
        <>
            {(ingredientListLoading || ingredientDeleteLoading) && <Loader />}
            {ingredientDeleteError && <Message variant='danger'> {ingredientDeleteError}</Message>}
            {ingredientListError ? <Message variant='danger'> {ingredientListError}</Message> : (
                <>
                    <h1 className='text-center'>Ingredient List</h1>
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><Image style={{ width: 70, height: 80 }} src={ingredient.image} alt={ingredient.name} fluid roundedCircle /></td>
                                    <td>{ingredient.name}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                                        >
                                            <Button className='my-3' onClick={() => handleDeleteIngredient(ingredient._id)}><i className="fas fa-trash-alt"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Edit </Tooltip>}
                                        >
                                            <Button className='my-3' disabled onClick={() => handleEditIngredient(ingredient._id)}><i className="fas fa-edit"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </>
            )}
        </>
    )
}

export default IngredientsListScreen
