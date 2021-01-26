
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return {}
        default:
            return state;
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true, success: false }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, user: action.payload.user, success: true }
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const userGetProfileReducer = (state = { userInfo: { cocktails: [], ingredients: [], reviews: [] } }, action) => {
    switch (action.type) {
        case 'USER_GET_PROFILE_REQUEST':
            return { loading: true, userInfo: { cocktails: [], ingredients: [], reviews: [] } }
        case 'USER_GET_PROFILE_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'USER_GET_PROFILE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_GET_PROFILE_LOGOUT':
            return { cocktails: [], ingredients: [], reviews: [] }
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_UPDATE_PROFILE_REQUEST':
            return { loading: true, success: false }
        case 'USER_UPDATE_PROFILE_SUCCESS':
            return { loading: false, success: true }
        case 'USER_UPDATE_PROFILE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_UPDATE_PROFILE_LOGOUT':
            return {}
        default:
            return state;
    }
}

export const userIngredientChangeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_INGREDIENT_ADD_REQUEST':
            return { loading: true }
        case 'USER_INGREDIENT_ADD_SUCCESS':
            return { loading: false, message: action.payload.message }
        case 'USER_INGREDIENT_ADD_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_INGREDIENT_REMOVE_REQUEST':
            return { loading: true }
        case 'USER_INGREDIENT_REMOVE_SUCCESS':
            return { loading: false, message: action.payload.message }
        case 'USER_INGREDIENT_REMOVE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_INGREDIENT_CHANGE_RESET':
            return {}
        default:
            return state;
    }
}

export const userGetCocktailsReducer = (state = { cocktails: [], oneShort: [] }, action) => {
    switch (action.type) {
        case 'USER_GET_COCKTAIL_REQUEST':
            return { loading: true, cocktails: [], oneShort: [] }
        case 'USER_GET_COCKTAIL_SUCCESS':
            return { loading: false, cocktails: action.payload.cocktails, oneShort: action.payload.oneShort }
        case 'USER_GET_COCKTAIL_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_GET_COCKTAIL_LOGOUT':
            return {}
        default:
            return state;
    }
}

export const userGetIngredientsReducer = (state = { ingredients: [] }, action) => {
    switch (action.type) {
        case 'USER_GET_INGREDIENTS_REQUEST':
            return { loading: true, ingredients: [] }
        case 'USER_GET_INGREDIENTS_SUCCESS':
            return { loading: false, ingredients: action.payload.ingredients }
        case 'USER_GET_INGREDIENTS_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_GET_INGREDIENTS_LOGOUT':
            return {}
        default:
            return state;
    }
}

export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'USERS_LIST_REQUEST':
            return { loading: true, users: [] }
        case 'USERS_LIST_SUCCESS':
            return { loading: false, users: action.payload.users }
        case 'USERS_LIST_FAIL':
            return { loading: false, error: action.payload }
        case 'USERS_LIST_LOGOUT':
            return {}
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DELETE_REQUEST':
            return { loading: true, success: false }
        case 'USER_DELETE_SUCCESS':
            return { loading: false, message: action.payload, success: true }
        case 'USER_DELETE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_DELETE_COMPLETED':
            return {}
        default:
            return state;
    }
}
