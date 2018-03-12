import React from 'react';
import { hot } from 'react-hot-loader';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route
} from 'react-router-dom';
import HomePage from './Home';
import Login from '../containers/Login';
import NavBar from './NavBar';
import Products from '../containers/Products';
import ProductDetailPage from './ProductDetailPage';

class App extends React.Component {
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
    return (
      <Router>
        <div>
          <AppBar position="static">
            <NavBar isSignedIn={this.state.isSignedIn} />
          </AppBar>
          {this.state.justSignedIn
            ? (() => {
                console.log("redirected", this.state.justSignedIn);
                return <Redirect to="/" />;
              })()
            : null
          }
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
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

export default hot(module)(App);
