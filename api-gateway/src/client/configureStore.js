import {
  applyMiddleware,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger();

export default function configureStore() {
  if (process.env.NODE_ENV !== 'production' && window.store) {
    window.store.replaceReducer(rootReducer);
    return window.store;
  }
  const store = createStore(rootReducer, applyMiddleware(logger));
  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
  }
  return store;
}
