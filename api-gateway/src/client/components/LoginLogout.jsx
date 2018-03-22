import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import PermIdentity from 'material-ui-icons/PermIdentity';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';

const LoginLogout = ({ isSignedIn, onLogout }) => (
  isSignedIn
    ?
      <Button
        color="inherit"
        onClick={onLogout}
      >
        <PowerSettingsNew />
          Logout
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
);

LoginLogout.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LoginLogout;
