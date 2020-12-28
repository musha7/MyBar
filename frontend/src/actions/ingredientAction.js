import axios from 'axios'

export const getIngredientsList = () => async (dispatch) => {
    try {

        dispatch({ type: 'INGREDIENT_LIST_REQUEST' });

        const { data } = await axios.get('/api/ingredients')

        dispatch({ type: 'INGREDIENT_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'INGREDIENT_LIST_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const addIngredientToBar = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'INGREDIENT_ADD_TO_BAR_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.put('/api/ingredients', { id }, config)

        dispatch({ type: 'INGREDIENT_ADD_TO_BAR_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'INGREDIENT_ADD_TO_BAR_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const removeIngredientFromBar = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'INGREDIENT_REMOVE_FROM_BAR_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` },
            data: { id: id }
        }

        const { data } = await axios.delete('/api/ingredients', config)

        dispatch({ type: 'INGREDIENT_REMOVE_FROM_BAR_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'INGREDIENT_REMOVE_FROM_BAR_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}