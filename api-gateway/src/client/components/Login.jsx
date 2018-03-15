import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    switch (event.target.type) {
      case 'text':
        this.setState({ username: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default: break;
    }
  }

  handleOnSubmit() {
    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {
    return [
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input onChange={this.handleOnChange} />
      </FormControl>,
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input onChange={this.handleOnChange} type="password" />
      </FormControl>,
      <Button
        onClick={this.handleOnSubmit}
      >
        Signin
      </Button>,
    ];
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
