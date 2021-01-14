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

export const addIngredient = (name, image, category, sub_category) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'INGREDIENT_ADD_TO_APP_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.post('/api/ingredients', { name, image, category, sub_category }, config)

        dispatch({ type: 'INGREDIENT_ADD_TO_APP_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'INGREDIENT_ADD_TO_APP_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const deleteIngredient = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'INGREDIENT_DELETE_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` },
            data: { id: id }
        }

        const { data } = await axios.delete('/api/ingredients', config)

        dispatch({ type: 'INGREDIENT_DELETE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'INGREDIENT_DELETE_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}