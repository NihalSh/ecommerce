import {
  createStore,
  combineReducers
} from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
  if (process.env.NODE_ENV !== 'production' && window.store) {
    return window.store;
  }
  const store = createStore(rootReducer);
  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
  }
  return store;
}