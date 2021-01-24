import React, { useEffect } from 'react'
import { Table, Button, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Rating from '../../components/Rating';
import { getCocktailsList, deleteCocktail } from '../../actions/cocktailActions'

const CocktailsListScreen = ({ history }) => {

    const cocktailList = useSelector(state => state.cocktailList);
    const { loading: cocktailListLoading, error: cocktailListError, cocktails } = cocktailList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cocktailDelete = useSelector(state => state.cocktailDelete);
    const { loading: cocktailDeleteLoading, error: cocktailDeleteError, success: cocktailDeleteSuccess } = cocktailDelete;

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (cocktails.length === 0) {
            dispatch(getCocktailsList())
        }
        if (cocktailDeleteSuccess) {
            dispatch({ type: 'COCKTAIL_DELETE_COMPLETED' })
            dispatch(getCocktailsList())
        }

    }, [dispatch, history, userInfo, cocktails.length, cocktailDeleteSuccess])

    const handleDeleteCocktail = (id) => {
        dispatch(deleteCocktail(id))
    }

    return (
        <>
            {(cocktailListLoading || cocktailDeleteLoading) && <Loader />}
            {cocktailDeleteError && <Message variant='danger'> {cocktailDeleteError}</Message>}
            {cocktailListError ? <Message variant='danger'> {cocktailListError}</Message> : (
                <>
                    <h1 className='text-center'>Cocktail List</h1>
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cocktails.map((cocktail, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><Image style={{ width: 70, height: 80 }} src={cocktail.image} alt={cocktail.name} fluid roundedCircle /></td>
                                    <td>{cocktail.name}</td>
                                    <td><Rating value={cocktail.rating} text={`${cocktail.numReviews} reviews`} /></td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                                        >
                                            <Button className='my-3' onClick={() => handleDeleteCocktail(cocktail._id)}><i className="fas fa-trash-alt"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Edit </Tooltip>}
                                        >
                                            <Link className='btn btn-dark my-3' to={`/admin/cocktails/${cocktail._id}`}><i className="fas fa-edit"></i></Link>
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

export default CocktailsListScreen
