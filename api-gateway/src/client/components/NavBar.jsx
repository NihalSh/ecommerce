import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Settings from 'material-ui-icons/Settings';
import Home from 'material-ui-icons/Home';
import PermIdentity from 'material-ui-icons/PermIdentity';
import { Link } from 'react-router-dom';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';


const NavBar = props => (
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
    { props.isSignedIn
      ?
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
);

NavBar.defaultProps = {
  isSignedIn: false,
};

NavBar.propTypes = {
  isSignedIn: PropTypes.bool,
};

export default NavBar;
