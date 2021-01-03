import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cocktailListReducer, cocktailByIdReducer } from './reducers/cocktailReducer'
import { ingredientListReducer } from './reducers/ingredientReducer'
import { userRegisterReducer, userLoginReducer, userGetProfileReducer, userUpdateProfileReducer, userIngredientChangeReducer, userGetCocktailsReducer } from './reducers/userReducer'
import { reviewAddReducer, reviewsByCocktailReducer } from './reducers/reviewReducer'

const reducer = combineReducers({
    cocktailList: cocktailListReducer,
    cocktailById: cocktailByIdReducer,
    ingredientList: ingredientListReducer,
    userIngredientChange: userIngredientChangeReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userGetProfile: userGetProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userGetCocktails: userGetCocktailsReducer,
    reviewAdd: reviewAddReducer,
    reviewsByCocktail: reviewsByCocktailReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } };
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store