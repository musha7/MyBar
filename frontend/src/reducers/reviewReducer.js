
export const reviewAddReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REVIEW_ADD_REQUEST':
            return { loading: true, success: false }
        case 'REVIEW_ADD_SUCCESS':
            return { loading: false, message: action.payload.message, success: true }
        case 'REVIEW_ADD_FAIL':
            return { loading: false, error: action.payload }
        case 'REVIEW_ADD_RESET':
            return {}
        default:
            return state;
    }
}

export const reviewsByCocktailReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case 'REVIEWS_BY_COCKTAIL_REQUEST':
            return { loading: true, success: false, reviews: [] }
        case 'REVIEWS_BY_COCKTAIL_SUCCESS':
            return { loading: false, reviews: action.payload.reviews, success: true }
        case 'REVIEWS_BY_COCKTAIL_FAIL':
            return { loading: false, error: action.payload }
        case 'REVIEWS_BY_COCKTAIL_RESET':
            return {}
        default:
            return state;
    }
}
