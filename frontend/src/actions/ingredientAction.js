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
