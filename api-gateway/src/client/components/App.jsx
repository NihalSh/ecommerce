import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Settings from 'material-ui-icons/Settings';
import Home from 'material-ui-icons/Home';
import PermIdentity from 'material-ui-icons/PermIdentity';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Login from './Login';
import ProductPage from './ProductPage';
import ProductDetailPage from './ProductDetailPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  /**
   * 
   * @param {boolean} isSignedIn 
   */
  handleSignIn(isSignedIn) {
    this.setState({
      isSignedIn
    });
  }

  render() {
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                E-commerce
              </Typography>
              <Button
                color="inherit"
                component={Link}
                to="/"
              >
                <Home />
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/products"
              >
                <ShoppingBasket />
                Products
              </Button>
              { this.state.isSignedIn ? 
                <Button
                  color="inherit"
                  component={Link}
                  to="/account"
                >
                  <Settings />
                  Account
                </Button>
                :
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  <PermIdentity />
                  Login
                </Button>
              }
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={null} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/account" component={null} />
          <Route exact path="/products/:id" component={ProductDetailPage} />
        </div>
      </Router>
    );
  }
}
