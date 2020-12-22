import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cocktailListReducer, cocktailByIdReducer } from './reducers/cocktailReducer'
import { ingredientListReducer } from './reducers/ingredientReducer'

const reducer = combineReducers({
    cocktailList: cocktailListReducer,
    cocktailById: cocktailByIdReducer,
    ingredientList: ingredientListReducer
});
const initialState = {};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store