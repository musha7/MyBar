
export const cocktailListReducer = (state = { cocktails: [] }, action) => {
    switch (action.type) {
        case 'COCKTAIL_LIST_REQUEST':
            return { loading: true, cocktails: [] }
        case 'COCKTAIL_LIST_SUCCESS':
            return { loading: false, cocktails: action.payload.cocktails }
        case 'COCKTAIL_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const cocktailByIdReducer = (state = { cocktail: { reviews: [], ingredients: [], steps: [] } }, action) => {
    switch (action.type) {
        case 'COCKTAIL_BY_ID_REQUEST':
            return { loading: true, cocktail: { reviews: [], ingredients: [], steps: [] } }
        case 'COCKTAIL_BY_ID_SUCCESS':
            return { loading: false, cocktail: action.payload.cocktail }
        case 'COCKTAIL_BY_ID_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const cocktailAddToAppReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COCKTAIL_ADD_TO_APP_REQUEST':
            return { loading: true, success: false }
        case 'COCKTAIL_ADD_TO_APP_SUCCESS':
            return { loading: false, payload: action.payload, success: true }
        case 'COCKTAIL_ADD_TO_APP_FAIL':
            return { loading: false, error: action.payload }
        case 'COCKTAIL_ADD_TO_APP_RESET':
            return {}
        default:
            return state;
    }
}

export const cocktailDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COCKTAIL_DELETE_REQUEST':
            return { loading: true, success: false }
        case 'COCKTAIL_DELETE_SUCCESS':
            return { loading: false, message: action.payload, success: true }
        case 'COCKTAIL_DELETE_FAIL':
            return { loading: false, error: action.payload }
        case 'COCKTAIL_DELETE_COMPLETED':
            return {}
        default:
            return state;
    }
}

export const cocktailTopRatedReducer = (state = { cocktails: [] }, action) => {
    switch (action.type) {
        case 'COCKTAIL_TOP_RATED_REQUEST':
            return { loading: true, cocktails: [] }
        case 'COCKTAIL_TOP_RATED_SUCCESS':
            return { loading: false, cocktails: action.payload.cocktails }
        case 'COCKTAIL_TOP_RATED_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const cocktailUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COCKTAIL_UPDATE_REQUEST':
            return { loading: true, success: false }
        case 'COCKTAIL_UPDATE_SUCCESS':
            return { loading: false, message: action.payload, success: true }
        case 'COCKTAIL_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'COCKTAIL_UPDATE_COMPLETED':
            return {}
        default:
            return state;
    }
}