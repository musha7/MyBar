import axios from 'axios'


export const addReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'REVIEW_ADD_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }
        const { data } = await axios.post(`/api/cocktails/${id}/reviews`, review, config)

        dispatch({ type: 'REVIEW_ADD_SUCCESS', payload: data })
        dispatch(getReviewsForCocktail(id))

    } catch (error) {
        dispatch({
            type: 'REVIEW_ADD_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const getReviewsForCocktail = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'REVIEWS_BY_COCKTAIL_REQUEST' });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        }
        const { data } = await axios.get(`/api/cocktails/${id}/reviews`, config)

        dispatch({ type: 'REVIEWS_BY_COCKTAIL_SUCCESS', payload: data })

    } catch (error) {
        dispatch({
            type: 'REVIEWS_BY_COCKTAIL_FAIL',
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}