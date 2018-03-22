import { connect } from 'react-redux';
import login from '../actions/user/index';
import Login from '../components/Login';

const handleOnSubmit = dispatch => (username, password) => {
  login(dispatch, username, password);
};

const mapDispatchToProps = dispatch => (
  {
    onSubmit: handleOnSubmit(dispatch),
  }
);

const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
