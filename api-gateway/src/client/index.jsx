import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './components/App';
 
 
const initialStoreData = {};
const store = configureStore(initialStoreData);


const appWithStore = (store) => (
    <Provider store={store}>
      <App />
    </Provider> 
);
    

ReactDOM.render(appWithStore(store), document.getElementById('app'));
