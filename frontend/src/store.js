import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    cocktailListReducer, cocktailByIdReducer, cocktailAddToAppReducer, cocktailDeleteReducer,
    cocktailTopRatedReducer, cocktailUpdateReducer
} from './reducers/cocktailReducer'
import { ingredientListReducer, ingredientAddToAppReducer, ingredientDeleteReducer, cocktailIngredientListReducer } from './reducers/ingredientReducer'
import {
    userRegisterReducer, userLoginReducer, userGetProfileReducer, userUpdateProfileReducer,
    userIngredientChangeReducer, userGetIngredientsReducer, userGetCocktailsReducer, usersListReducer,
    userDeleteReducer
} from './reducers/userReducer'
import { reviewAddReducer, reviewsByCocktailReducer } from './reducers/reviewReducer'

const reducer = combineReducers({
    cocktailList: cocktailListReducer,
    cocktailById: cocktailByIdReducer,
    cocktailAddToApp: cocktailAddToAppReducer,
    cocktailDelete: cocktailDeleteReducer,
    cocktailTopRated: cocktailTopRatedReducer,
    cocktailUpdate: cocktailUpdateReducer,
    ingredientList: ingredientListReducer,
    ingredientAddToApp: ingredientAddToAppReducer,
    ingredientDelete: ingredientDeleteReducer,
    cocktailIngredientList: cocktailIngredientListReducer,
    userIngredientChange: userIngredientChangeReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userGetProfile: userGetProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userGetIngredients: userGetIngredientsReducer,
    userGetCocktails: userGetCocktailsReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    reviewAdd: reviewAddReducer,
    reviewsByCocktail: reviewsByCocktailReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } };
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store