import React from 'react';
import { hot } from 'react-hot-loader';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from './Home';
import Login from '../containers/Login';
import NavBar from './NavBar';
import Products from '../containers/Products';
import ProductDetails from '../containers/ProductDetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  render() {
    return (
      <Router>
        <div>
          <AppBar position="static">
            <NavBar isSignedIn={this.state.isSignedIn} />
          </AppBar>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/account" component={null} />
          <Route exact path="/products/:id" component={ProductDetails} />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
