import Footer from './components/Footer'
import Header from './components/Header'
//import HomeScreen from './screens/HomeScreen'
import CocktailsScreen from './screens/CocktailsScreen'
import SingleCocktailScreen from './screens/SingleCocktailScreen'
import IngredientsScreen from './screens/IngredientsScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import Login from './screens/LoginScreen'
import Register from './screens/RegisterScreen'
import MyCocktailsScreen from './screens/MyCocktailsScreen'
import MyIngredientsScreen from './screens/MyIngredientsScreen'
import AddIngredientScreen from './screens/AddIngredientScreen'
import AddCocktailScreen from './screens/AddCocktailScreen'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={CocktailsScreen} exact />
          <Route path='/ingredients' component={IngredientsScreen} />
          <Route path='/cocktails/:id' component={SingleCocktailScreen} />
          <Route path='/cocktails' component={CocktailsScreen} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={UserProfileScreen} />
          <Route path='/myCocktails' component={MyCocktailsScreen} />
          <Route path='/myIngredients' component={MyIngredientsScreen} />
          <Route path='/addIngredient' component={AddIngredientScreen} />
          <Route path='/addCocktail' component={AddCocktailScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
