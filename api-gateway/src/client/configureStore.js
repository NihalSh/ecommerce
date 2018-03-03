import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import reducer from './reducers';

const createAppStore = compose(
  applyMiddleware(promiseMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore); 


export default function configureStore(initialState) {
  const store = createAppStore(reducer, initialState);
  return store;
}
