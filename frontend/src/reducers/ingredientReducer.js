
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

// export const ingredientChangeInBarReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'INGREDIENT_ADD_TO_BAR_REQUEST':
//             return { loading: true }
//         case 'INGREDIENT_ADD_TO_BAR_SUCCESS':
//             return { loading: false, message: action.payload }
//         case 'INGREDIENT_ADD_TO_BAR_FAIL':
//             return { loading: false, error: action.payload }
//         case 'INGREDIENT_REMOVE_FROM_BAR_REQUEST':
//             return { loading: true }
//         case 'INGREDIENT_REMOVE_FROM_BAR_SUCCESS':
//             return { loading: false, message: action.payload }
//         case 'INGREDIENT_REMOVE_FROM_BAR_FAIL':
//             return { loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }
