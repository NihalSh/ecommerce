import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import Settings from 'material-ui-icons/Settings';
import Home from 'material-ui-icons/Home';
import PermIdentity from 'material-ui-icons/PermIdentity';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
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
      showSnackbar: false,
      snackbarMessage: '',
      justSignedIn: false,
      token: '',
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    console.log("called");
  }

  /**
   * 
   * @param {string} username 
   * @param {string} password 
   */
  handleSignIn(username, password) {
    console.log(username, password);
    fetch('api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `userid=${username}&password=${password}`,
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw new Error('authentication failed');
    }).then((data) => {
      console.log(data);
      this.setState({
        isSignedIn: true,
        showSnackbar: true,
        snackbarMessage: "Signin Successful",
        justSignedIn: true,
        token: data.token,
      });
    }).catch((err) => {
      this.setState({
        isSignedIn: false,
        showSnackbar: true,
        snackbarMessage: "Signin Failed",
        justSignedIn: false,
      });
      console.error(err)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.justSignedIn) {
      this.setState(
        Object.assign({}, prevState, {justSignedIn: false})
      );
    }
  }

  render() {
    const LoginWrapper = () => (
      <Login
        handleOnSubmit={this.handleSignIn}
        isSignedIn={this.state.isSignedIn}
      />
    );

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
              { this.state.isSignedIn
                ? <Button
                    color="inherit"
                    component={Link}
                    to="/account"
                  >
                    <Settings />
                    Account
                  </Button>
                : <Button
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
          {this.state.justSignedIn
            ? (() => {
                return <Redirect to="/" />;
              })()
            : <Route exact path="/" component={null} />
          }
          <Route exact path="/login" component={LoginWrapper} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/account" component={null} />
          <Route exact path="/products/:id" component={ProductDetailPage} />
          <Snackbar
            autoHideDuration={3000}
            open={this.state.showSnackbar}
            message={this.state.snackbarMessage}
            onClose={() => (this.setState(
              Object.assign({}, this.state, {showSnackbar: false})))
            }
          />
        </div>
      </Router>
    );
  }
}
