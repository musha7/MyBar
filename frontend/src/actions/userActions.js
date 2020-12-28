import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    console.log('loging');
    try {

        dispatch({ type: 'USER_LOGIN_REQUEST' });
        const loginInfo = { email, password }
        // const config = {
        //     headers: { 'Content-type': 'application/json' }
        // }
        const { data } = await axios.post('/api/users/login', loginInfo)

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo')
        dispatch({ type: 'USER_LOGOUT' })
        dispatch({ type: 'USER_GET_PROFILE_LOGOUT' })
        dispatch({ type: 'USER_UPDATE_PROFILE_LOGOUT' })
    } catch (error) {
        dispatch({
            type: 'USER_LOGOUT_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const register = (email, name, password) => async (dispatch) => {
    try {

        dispatch({ type: 'USER_REGISTER_REQUEST' });
        const loginInfo = { email, name, password }
        // const config = {
        //     headers: { 'Content-type': 'application/json' }
        // }
        const { data } = await axios.post('/api/users/register', loginInfo)

        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })

        dispatch(login(email, password))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getUserProfile = () => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USER_GET_PROFILE_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.get('/api/users/profile', config)

        dispatch({ type: 'USER_GET_PROFILE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'USER_GET_PROFILE_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const updateUserProfile = (email, name, password) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.put('/api/users/profile', { email, name, password }, config)

        dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data, success: true })

    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}