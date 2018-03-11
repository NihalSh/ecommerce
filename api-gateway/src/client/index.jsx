import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import configureStore from './configureStore';
import App from './components/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
