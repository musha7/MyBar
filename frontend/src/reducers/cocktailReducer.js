
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