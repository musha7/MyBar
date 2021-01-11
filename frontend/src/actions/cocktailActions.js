import axios from 'axios'

export const getCocktailsList = () => async (dispatch) => {
    try {

        dispatch({ type: 'COCKTAIL_LIST_REQUEST' });

        const { data } = await axios.get('/api/cocktails')

        dispatch({ type: 'COCKTAIL_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'COCKTAIL_LIST_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const getCocktailById = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'COCKTAIL_BY_ID_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.get(`/api/cocktails/${id}`, config)

        dispatch({ type: 'COCKTAIL_BY_ID_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'COCKTAIL_BY_ID_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const addCocktail = (name, image, ingredients, steps) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'COCKTAIL_ADD_TO_APP_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }

        const { data } = await axios.post('/api/cocktails', { name, image, ingredients, steps }, config)
        console.log(data);
        dispatch({ type: 'COCKTAIL_ADD_TO_APP_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'COCKTAIL_ADD_TO_APP_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}