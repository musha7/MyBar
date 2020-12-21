
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

export const cocktailByIdReducer = (state = {}, action) => {
    console.log('action.payload: ', action.payload);
    switch (action.type) {
        case 'COCKTAIL_BY_ID_REQUEST':
            return { loading: true, cocktail: {} }
        case 'COCKTAIL_BY_ID_SUCCESS':
            return { loading: false, cocktail: action.payload.cocktail }
        case 'COCKTAIL_BY_ID_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}