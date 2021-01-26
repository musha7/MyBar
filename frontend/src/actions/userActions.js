import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: 'USER_LOGIN_REQUEST' });
        const loginInfo = { email, password }

        const { data } = await axios.post('/api/users/login', loginInfo)

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

        dispatch(getUserProfile())

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
        dispatch({ type: 'USER_INGREDIENT_CHANGE_RESET' })
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

export const addIngredientToUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_INGREDIENT_ADD_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.put('/api/users/ingredients', { id }, config)

        dispatch({ type: 'USER_INGREDIENT_ADD_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'USER_INGREDIENT_ADD_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const removeIngredientFromUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_INGREDIENT_REMOVE_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` },
            data: { id: id }
        }

        const { data } = await axios.delete('/api/users/ingredients', config)

        dispatch({ type: 'USER_INGREDIENT_REMOVE_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'USER_INGREDIENT_REMOVE_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getUserIngredients = () => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USER_GET_INGREDIENTS_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.get('/api/users/ingredients', config)

        dispatch({ type: 'USER_GET_INGREDIENTS_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'USER_GET_INGREDIENTS_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const getUserCocktails = () => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USER_GET_COCKTAIL_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.get('/api/users/cocktails', config)

        dispatch({ type: 'USER_GET_COCKTAIL_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'USER_GET_COCKTAIL_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getUsersList = () => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USERS_LIST_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.get('/api/users', config)

        dispatch({ type: 'USERS_LIST_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'USERS_LIST_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'USER_DELETE_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` },
            data: { id: id }
        }

        const { data } = await axios.delete('/api/users', config)

        dispatch({ type: 'USER_DELETE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}
