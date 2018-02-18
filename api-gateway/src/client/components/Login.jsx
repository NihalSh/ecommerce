import React from 'react';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input'
import { Link, Route } from 'react-router-dom';

function onSubmit() {
  console.log('# TODO');
}

export default () => (
  <form method="POST" onSubmit={onSubmit} action="/login">
    <FormControl>
      <InputLabel>Username</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel>Password</InputLabel>
      <Input type="password" />
    </FormControl>
    <Button
      onClick={onSubmit}
    >Signin</Button>
  </form>
);
