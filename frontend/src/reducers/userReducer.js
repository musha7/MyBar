
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

export const userGetProfileReducer = (state = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'USER_GET_PROFILE_REQUEST':
            return { loading: true }
        case 'USER_GET_PROFILE_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'USER_GET_PROFILE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_GET_PROFILE_LOGOUT':
            return {}
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