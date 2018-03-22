import React from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Home from 'material-ui-icons/Home';
import { Link } from 'react-router-dom';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import LoginLogout from '../containers/LoginLogout';


const NavBar = () => (
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
    <LoginLogout />
  </Toolbar>
);

export default NavBar;
