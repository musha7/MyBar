
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