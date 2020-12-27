import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import CocktailsScreen from './screens/CocktailsScreen'
import SingleCocktailScreen from './screens/SingleCocktailScreen'
import IngredientsScreen from './screens/IngredientsScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import Login from './screens/LoginScreen'
import Register from './screens/RegisterScreen'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/ingredients' component={IngredientsScreen} />
          <Route path='/cocktails/:id' component={SingleCocktailScreen} />
          <Route path='/cocktails' component={CocktailsScreen} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={UserProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
