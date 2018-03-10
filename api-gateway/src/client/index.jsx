import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import 'whatwg-fetch';
import App from './components/App';

const AppWrapper = hot(module)(App);

ReactDOM.render(<AppWrapper />, document.getElementById('app'));
