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

export const getCocktailIngredientsList = () => async (dispatch) => {
    try {
        dispatch({ type: 'COCKTAIL_INGREDIENT_LIST_REQUEST' });

        const { data } = await axios.get('/api/ingredients/cocktailIngredients')

        dispatch({ type: 'COCKTAIL_INGREDIENT_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'COCKTAIL_INGREDIENT_LIST_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const addIngredient = (name, image, alcoholic, subCategory) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'INGREDIENT_ADD_TO_APP_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.post('/api/ingredients', { name, image, alcoholic, subCategory }, config)

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

export const getTopUsedIngredientsList = () => async (dispatch) => {
    try {

        dispatch({ type: 'INGREDIENT_TOP_USED_LIST_REQUEST' });

        const { data } = await axios.get('/api/ingredients/top')

        dispatch({ type: 'INGREDIENT_TOP_USED_LIST_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'INGREDIENT_TOP_USED_LIST_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}