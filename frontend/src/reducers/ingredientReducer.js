
export const ingredientListReducer = (state = { ingredients: [] }, action) => {
    switch (action.type) {
        case 'INGREDIENT_LIST_REQUEST':
            return { loading: true, ingredients: [] }
        case 'INGREDIENT_LIST_SUCCESS':
            return { loading: false, ingredients: action.payload.ingredients }
        case 'INGREDIENT_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const ingredientAddToAppReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INGREDIENT_ADD_TO_APP_REQUEST':
            return { loading: true, success: false }
        case 'INGREDIENT_ADD_TO_APP_SUCCESS':
            return { loading: false, message: action.payload.message, success: true }
        case 'INGREDIENT_ADD_TO_APP_FAIL':
            return { loading: false, error: action.payload }
        case 'INGREDIENT_ADD_TO_APP_RESET':
            return {}
        default:
            return state;
    }
}

export const ingredientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INGREDIENT_DELETE_REQUEST':
            return { loading: true, success: false }
        case 'INGREDIENT_DELETE_SUCCESS':
            return { loading: false, message: action.payload, success: true }
        case 'INGREDIENT_DELETE_FAIL':
            return { loading: false, error: action.payload }
        case 'INGREDIENT_DELETE_COMPLETED':
            return {}
        default:
            return state;
    }
}