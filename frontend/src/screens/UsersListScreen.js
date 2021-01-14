import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../actions/userActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteUser } from '../actions/userActions'

const UsersListScreen = ({ history }) => {
    const [makeAdmin, setMakeAdmin] = useState(false)

    const usersList = useSelector(state => state.usersList);
    const { loading: usersListLoading, error: usersListError, users } = usersList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: deleteUserLoading, error: deleteUserError, success: userDeleteSuccess, message } = userDelete;

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (users.length === 0) {
            dispatch(getUsersList())
        }
        if (userDeleteSuccess) {
            dispatch({ type: 'USER_DELETE_COMPLETED' })
            dispatch(getUsersList())
        }
        if (makeAdmin) {
            dispatch(getUsersList())
            setMakeAdmin(false)
        }

    }, [dispatch, history, userInfo, userDeleteSuccess, message, users.length, makeAdmin])

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
    }
    const handleMakeAdmin = async (id) => {
        try {
            const config = {
                headers: { 'Authorization': `Bearer ${userInfo.token}` },
            }
            const ret = await axios.put('/api/users', { id }, config)
            console.log(ret);
            setMakeAdmin(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {(usersListLoading || deleteUserLoading) && <Loader />}
            {deleteUserError && <Message variant='danger'> {deleteUserError}</Message>}
            {usersListError ? <Message variant='danger'> {usersListError}</Message> : (
                <>
                    <h1 className='text-center'>Users List</h1>
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin?</th>
                                <th>Delete</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ?
                                        <i className="fas fa-check"></i> :
                                        <i className="fas fa-times"></i>}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Delete User</Tooltip>}
                                        >
                                            <Button onClick={() => handleDeleteUser(user._id)}><i className="fas fa-trash-alt"></i></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip-2">Make {user.name} Admin</Tooltip>}
                                        >
                                            <Button disabled={user.isAdmin} onClick={() => handleMakeAdmin(user._id)}><i className="fas fa-user-shield"></i></Button>
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

export default UsersListScreen
