import { connect } from 'react-redux';
import LoginLogout from '../components/LoginLogout';
import actionTypes from '../actions/types';

const handleLogout = dispatch => () => {
  dispatch({ type: actionTypes.LOGOUT });
};

const mapStateToProps = state => ({
  isSignedIn: state.user.id !== undefined,
});

const mapDispatchToProps = dispatch => ({
  onLogout: handleLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogout);
