import React from 'react';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import { Link, Redirect, Route } from 'react-router-dom';

function onSubmit() {
  console.log('# TODO');
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      snackbar: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  
  handleOnChange(event) {
    switch (event.target.type) {
    case 'text':
      this.setState(
	Object.assign(
	  {},
	  this.state,
	  {
	    username: event.target.value,
	  }
	)
      );
      break;
    case 'password':
      this.setState(
	Object.assign(
	  {},
	  this.state,
	  {
	    password: event.target.value,
	  }
	)
      );
      break;
    };
  }
  
  handleOnSubmit() {
    this.props.handleOnSubmit(this.state.username, this.state.password);
  }

  render() {
    const finalComponent = this.props.isSignedIn
      ? <Snackbar
          autoHideDuration={3000}
          message="Signin successful"
          open={false}
          onClose={
            () => (
              this.setState(
                Object.assign({}, this.state, { snackbar: false })
              )
            )
          }
        />
      : [
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
          >Signin</Button>
        ];
    return finalComponent;
  }
}
